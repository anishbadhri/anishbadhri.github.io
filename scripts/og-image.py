#!/usr/bin/env python3
"""
Regenerate the Open Graph image at src/assets/og-image.png (1200x630).

Usage:
    pip install Pillow
    python scripts/og-image.py

To use a real photo instead of the placeholder avatar, drop a square image at
src/assets/profile.jpg and set USE_PHOTO = True below.
"""
from PIL import Image, ImageDraw, ImageFont

USE_PHOTO = False
PHOTO_PATH = "src/assets/profile.jpg"
OUT = "src/assets/og-image.png"

W, H = 1200, 630
BG = (13, 17, 23)        # Primer dark canvas
FG = (240, 246, 252)
MUT = (145, 152, 161)
ACC = (182, 158, 255)    # dark-mode iris/violet accent
BORDER = (61, 68, 77)

F = "/usr/share/fonts/truetype/dejavu/"  # adjust if your fonts live elsewhere
def sans(sz, bold=False): return ImageFont.truetype(F + ("DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"), sz)
def mono(sz, bold=False): return ImageFont.truetype(F + ("DejaVuSansMono-Bold.ttf" if bold else "DejaVuSansMono.ttf"), sz)

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)
d.rectangle([0, 0, 10, H], fill=ACC)

x = 80
d.text((x, 92), "SENIOR SOFTWARE ENGINEER  ·  GOOGLE WORKSPACE", font=mono(22, True), fill=ACC)
d.text((x, 150), "Anish Badri R S", font=sans(86, True), fill=FG)
d.text((x, 270), "Identity Protocols (LDAP, SCIM)", font=sans(38), fill=FG)
d.text((x, 322), "Sunnyvale, CA", font=sans(30), fill=MUT)

tx, ty, tf = x, 400, mono(24)
for t in ["LDAP", "SCIM", "Distributed Systems", "Data Migration"]:
    bb = d.textbbox((0, 0), t, font=tf)
    tw, th = bb[2]-bb[0], bb[3]-bb[1]
    d.rounded_rectangle([tx, ty, tx+tw+36, ty+th+24], radius=8, outline=BORDER, width=2)
    d.text((tx+18, ty+12-bb[1]), t, font=tf, fill=MUT)
    tx += tw + 36 + 16

d.text((x, H-92), "anishbadhri.github.io", font=mono(28, True), fill=ACC)

# Right side: real photo (circular crop) or placeholder avatar.
cx, cy, r = 1000, 250, 120
if USE_PHOTO:
    from PIL import ImageOps
    photo = ImageOps.fit(Image.open(PHOTO_PATH).convert("RGB"), (2*r, 2*r))
    mask = Image.new("L", (2*r, 2*r), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, 2*r, 2*r], fill=255)
    img.paste(photo, (cx-r, cy-r), mask)
    d.ellipse([cx-r-6, cy-r-6, cx+r+6, cy+r+6], outline=ACC, width=6)
else:
    d.ellipse([cx-r-6, cy-r-6, cx+r+6, cy+r+6], outline=ACC, width=6)
    d.ellipse([cx-r, cy-r, cx+r, cy+r], fill=(22, 27, 34))
    af = sans(120, True)
    bb = d.textbbox((0, 0), "A", font=af)
    d.text((cx-(bb[2]-bb[0])/2-bb[0], cy-(bb[3]-bb[1])/2-bb[1]), "A", font=af, fill=ACC)
    d.text((cx-95, cy+r+24), "placeholder photo", font=mono(18), fill=MUT)

img.save(OUT, "PNG", optimize=True)
print("Wrote", OUT, img.size)
