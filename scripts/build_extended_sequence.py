from __future__ import annotations

import math
import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
FRAME_DIR = ROOT / "public" / "frames" / "rigi"
CLOUD_PLATE = Path(
    r"C:\Users\masoud\.codex\generated_images\01a107ca-ef28-7f32-bdc3-d5de856fd4bd\exec-08dcba66-7722-44c4-844d-d6474449c2fb.png"
)
INTRO_COUNT = 24
SOURCE_COUNT = 120
OUTPUT_COUNT = INTRO_COUNT + SOURCE_COUNT
SIZE = (1920, 1080)


def smoothstep(value: float) -> float:
    return value * value * (3.0 - 2.0 * value)


def cover(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    target_w, target_h = size
    ratio = max(target_w / image.width, target_h / image.height)
    resized = image.resize(
        (math.ceil(image.width * ratio), math.ceil(image.height * ratio)),
        Image.Resampling.LANCZOS,
    )
    left = (resized.width - target_w) // 2
    top = (resized.height - target_h) // 2
    return resized.crop((left, top, left + target_w, top + target_h))


def zoom(image: Image.Image, scale: float, y_bias: int = 0) -> Image.Image:
    width, height = image.size
    resized = image.resize(
        (round(width * scale), round(height * scale)), Image.Resampling.LANCZOS
    )
    left = (resized.width - width) // 2
    top = max(0, (resized.height - height) // 2 + y_bias)
    top = min(top, resized.height - height)
    return resized.crop((left, top, left + width, top + height))


def make_intro(source_first: Image.Image, cloud_plate: Image.Image) -> list[Image.Image]:
    frames: list[Image.Image] = []
    for index in range(INTRO_COUNT):
        progress = index / (INTRO_COUNT - 1)
        eased = smoothstep(progress)

        # A restrained push-in through the cloud plate sells the drone descent.
        cloud = zoom(cloud_plate, 1.0 + 0.10 * eased, round(18 * eased))
        neighborhood = zoom(source_first, 1.04 - 0.04 * eased)
        neighborhood = ImageEnhance.Contrast(neighborhood).enhance(0.92 + 0.08 * eased)

        # Hold the cloud atmosphere early, then reveal the exact source neighborhood.
        reveal = smoothstep(max(0.0, (progress - 0.18) / 0.82))
        frame = Image.blend(cloud, neighborhood, reveal)

        # A soft mid-descent haze keeps the dissolve atmospheric rather than graphic.
        haze_strength = max(0.0, 1.0 - abs(progress - 0.48) / 0.36) * 0.10
        if haze_strength > 0:
            haze = Image.new("RGB", SIZE, (238, 225, 203)).filter(ImageFilter.GaussianBlur(20))
            frame = Image.blend(frame, haze, haze_strength)

        # The last intro frame is the untouched original endpoint for a zero-jump handoff.
        frames.append(source_first.copy() if index == INTRO_COUNT - 1 else frame)
    return frames


def roof_mask(size: tuple[int, int]) -> Image.Image:
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.polygon([(450, 345), (640, 307), (1115, 309), (1175, 335), (1138, 390), (455, 392)], fill=255)
    draw.polygon([(1120, 323), (1230, 321), (1450, 354), (1435, 394), (1135, 391)], fill=255)
    draw.polygon([(230, 575), (505, 480), (770, 510), (720, 608), (238, 617)], fill=255)
    draw.polygon([(1110, 505), (1210, 476), (1600, 540), (1675, 590), (1638, 612), (1172, 596)], fill=255)
    return mask.filter(ImageFilter.GaussianBlur(2.0))


def aligned_finish(target: Image.Image, source_number: int) -> Image.Image:
    # Late source frames differ by only a gentle drone drift. This small transform
    # aligns frame 118's finished roofing to frames 113–117 without changing the scene.
    distance = 118 - source_number
    scale = 1.0 + distance * 0.0035
    return zoom(target, scale, -round(distance * 1.5))


def add_roof_progression(source: Image.Image, finished: Image.Image, source_number: int) -> Image.Image:
    progression = {113: 0.16, 114: 0.30, 115: 0.47, 116: 0.66, 117: 0.84}
    amount = progression[source_number]
    target = aligned_finish(finished, source_number)
    mask = roof_mask(source.size).point(lambda value: round(value * amount))
    return Image.composite(target, source, mask)


def main() -> None:
    sources = [
        Image.open(FRAME_DIR / f"frame_{number:03d}.webp").convert("RGB")
        for number in range(1, SOURCE_COUNT + 1)
    ]
    cloud = cover(Image.open(CLOUD_PLATE).convert("RGB"), SIZE)
    intro = make_intro(sources[0], cloud)
    finished_roof_reference = sources[117]  # Existing completed frame 118.

    staging = ROOT / ".sequence-staging"
    if staging.exists():
        shutil.rmtree(staging)
    staging.mkdir()

    output_frames = intro[:]
    for number, source in enumerate(sources, start=1):
        if 113 <= number <= 117:
            source = add_roof_progression(source, finished_roof_reference, number)
        output_frames.append(source)

    assert len(output_frames) == OUTPUT_COUNT
    for index, frame in enumerate(output_frames, start=1):
        frame.save(staging / f"frame_{index:03d}.webp", "WEBP", quality=95, method=4)

    for existing in FRAME_DIR.glob("frame_*.webp"):
        existing.unlink()
    for staged in staging.glob("frame_*.webp"):
        shutil.move(str(staged), FRAME_DIR / staged.name)
    staging.rmdir()
    print(f"wrote {OUTPUT_COUNT} continuous frames")


if __name__ == "__main__":
    main()
