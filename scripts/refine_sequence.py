from __future__ import annotations

import math
import shutil
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
FRAME_DIR = ROOT / "public" / "frames" / "rigi"
HIGH_CLOUD_PLATE = Path(
    r"C:\Users\masoud\.codex\generated_images\01a107ca-ef28-7f32-bdc3-d5de856fd4bd\exec-08dcba66-7722-44c4-844d-d6474449c2fb.png"
)
MID_CLOUD_PLATE = Path(
    r"C:\Users\masoud\.codex\generated_images\01a107ca-ef28-7f32-bdc3-d5de856fd4bd\exec-666c0b90-76a3-4826-bcc3-13d402e620e8.png"
)
LOW_CLOUD_PLATE = Path(
    r"C:\Users\masoud\.codex\generated_images\01a107ca-ef28-7f32-bdc3-d5de856fd4bd\exec-5f2491e8-8d74-4a69-a772-c7def808466b.png"
)
SIZE = (1920, 1080)


def smoothstep(value: float) -> float:
    value = min(1.0, max(0.0, value))
    return value * value * (3.0 - 2.0 * value)


def cover(image: Image.Image) -> Image.Image:
    ratio = max(SIZE[0] / image.width, SIZE[1] / image.height)
    resized = image.resize(
        (math.ceil(image.width * ratio), math.ceil(image.height * ratio)),
        Image.Resampling.LANCZOS,
    )
    left = (resized.width - SIZE[0]) // 2
    top = (resized.height - SIZE[1]) // 2
    return resized.crop((left, top, left + SIZE[0], top + SIZE[1]))


def zoom(image: Image.Image, scale: float, y_bias: int = 0) -> Image.Image:
    width, height = image.size
    resized = image.resize(
        (round(width * scale), round(height * scale)), Image.Resampling.LANCZOS
    )
    left = (resized.width - width) // 2
    top = min(
        resized.height - height,
        max(0, (resized.height - height) // 2 + y_bias),
    )
    return resized.crop((left, top, left + width, top + height))


def refine_intro() -> None:
    neighborhood = Image.open(FRAME_DIR / "frame_025.webp").convert("RGB")
    high_clouds = cover(Image.open(HIGH_CLOUD_PLATE).convert("RGB"))
    mid_clouds = cover(Image.open(MID_CLOUD_PLATE).convert("RGB"))
    low_clouds = cover(Image.open(LOW_CLOUD_PLATE).convert("RGB"))

    for index in range(24):
        if index < 8:
            phase = smoothstep(index / 7)
            high = zoom(high_clouds, 1.0 + 0.13 * phase, round(42 * phase))
            mid = zoom(mid_clouds, 1.0 + 0.035 * phase, round(16 * phase))
            frame = Image.blend(high, mid, phase)
        elif index < 16:
            phase = smoothstep((index - 8) / 7)
            mid = zoom(mid_clouds, 1.035 + 0.08 * phase, round(16 + 30 * phase))
            low = zoom(low_clouds, 1.0 + 0.035 * phase, round(12 * phase))
            frame = Image.blend(mid, low, phase)
        else:
            phase = smoothstep((index - 16) / 7)
            low = zoom(low_clouds, 1.035 + 0.06 * phase, round(12 + 26 * phase))
            real_view = zoom(neighborhood, 1.018 - 0.018 * phase)
            real_view = ImageEnhance.Contrast(real_view).enhance(0.98 + 0.02 * phase)
            frame = Image.blend(low, real_view, phase)

        if index == 23:
            frame = neighborhood.copy()
        frame.save(FRAME_DIR / f"frame_{index + 1:03d}.webp", "WEBP", quality=95, method=4)

    # Byte-identical handoff frame: the intro endpoint and original opening match exactly.
    shutil.copyfile(FRAME_DIR / "frame_025.webp", FRAME_DIR / "frame_024.webp")


def plane_masks(size: tuple[int, int]) -> list[Image.Image]:
    polygons = [
        [(230, 575), (505, 480), (770, 510), (720, 608), (238, 617)],
        [(450, 345), (640, 307), (1115, 309), (1175, 335), (1138, 390), (455, 392)],
        [(1120, 323), (1230, 321), (1450, 354), (1435, 394), (1135, 391)],
        [(1110, 505), (1210, 476), (1600, 540), (1675, 590), (1638, 612), (1172, 596)],
    ]
    masks: list[Image.Image] = []
    for polygon in polygons:
        mask = Image.new("L", size, 0)
        ImageDraw.Draw(mask).polygon(polygon, fill=255)
        masks.append(mask.filter(ImageFilter.GaussianBlur(2.0)))
    return masks


def refine_roof() -> None:
    finished = Image.open(FRAME_DIR / "frame_142.webp").convert("RGB")
    masks = plane_masks(SIZE)
    coverage = {
        137: (0.18, 0.04, 0.00, 0.00),
        138: (0.42, 0.20, 0.10, 0.05),
        139: (0.70, 0.46, 0.34, 0.24),
        140: (0.92, 0.72, 0.64, 0.54),
        141: (1.00, 0.91, 0.88, 0.84),
    }

    for frame_number, plane_coverage in coverage.items():
        source = Image.open(FRAME_DIR / f"frame_{frame_number:03d}.webp").convert("RGB")
        distance = 142 - frame_number
        target = zoom(finished, 1.0 + distance * 0.0035, -round(distance * 1.5))

        combined = Image.new("L", SIZE, 0)
        for mask, amount in zip(masks, plane_coverage):
            weighted = mask.point(lambda value, amount=amount: round(value * amount))
            combined = ImageChops.lighter(combined, weighted)
        result = Image.composite(target, source, combined)
        result.save(FRAME_DIR / f"frame_{frame_number:03d}.webp", "WEBP", quality=95, method=4)


def main() -> None:
    refine_intro()
    print("refined moving cloud descent frames 001-024")


if __name__ == "__main__":
    main()
