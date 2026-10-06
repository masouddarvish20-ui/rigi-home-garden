from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
FRAMES = ROOT / "public" / "frames" / "rigi"

GENERATED = {
    118: Path(r"C:\Users\masoud\.codex\generated_images\01a107ca-ef28-7f32-bdc3-d5de856fd4bd\exec-1688d6e8-52d8-4892-ace8-25ac43777ebd.png"),
    119: Path(r"C:\Users\masoud\.codex\generated_images\01a107ca-ef28-7f32-bdc3-d5de856fd4bd\exec-26b7746c-c422-47fc-8888-6609a29b4772.png"),
    120: Path(r"C:\Users\masoud\.codex\generated_images\01a107ca-ef28-7f32-bdc3-d5de856fd4bd\exec-28e229ef-140a-4ba7-89e3-fdb4c13efe6c.png"),
}


def surface_mask(size: tuple[int, int]) -> Image.Image:
    """Mask only the unfinished roof planes and exposed front-left facade wrap."""
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)

    # Upper roof planes.
    draw.polygon([(450, 345), (640, 307), (1115, 309), (1175, 335), (1138, 388), (455, 390)], fill=255)
    draw.polygon([(1120, 323), (1230, 321), (1450, 354), (1435, 392), (1135, 389)], fill=255)

    # Lower left and lower right roof groups.
    draw.polygon([(230, 575), (505, 480), (770, 510), (720, 606), (238, 615)], fill=255)
    draw.polygon([(1110, 505), (1210, 476), (1600, 540), (1675, 590), (1638, 610), (1172, 594)], fill=255)

    # Unfinished weather barrier around the front-left window, split so the
    # original window, trim, and wall lights stay untouched.
    draw.polygon([(354, 575), (603, 582), (595, 633), (421, 625), (421, 646), (355, 646)], fill=255)
    draw.polygon([(350, 620), (426, 623), (426, 775), (350, 779)], fill=255)
    draw.polygon([(542, 626), (601, 630), (598, 770), (542, 770)], fill=255)
    draw.polygon([(350, 742), (600, 742), (598, 790), (350, 790)], fill=255)

    # A narrow feather prevents a hard compositing seam while keeping every
    # unrelated part of the source frame unchanged.
    return mask.filter(ImageFilter.GaussianBlur(2.0))


def main() -> None:
    for number, generated_path in GENERATED.items():
        frame_path = FRAMES / f"frame_{number:03d}.webp"
        source = Image.open(frame_path).convert("RGB")
        finished = Image.open(generated_path).convert("RGB").resize(source.size, Image.Resampling.LANCZOS)
        result = Image.composite(finished, source, surface_mask(source.size))
        result.save(frame_path, "WEBP", quality=94, method=6)
        print(f"updated {frame_path.name}")


if __name__ == "__main__":
    main()
