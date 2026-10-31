#!/usr/bin/env python3
"""index.html degistiginde versions/ altina otomatik snapshot kaydeder."""
import hashlib, os, shutil, sys, time

TARGET = sys.argv[1] if len(sys.argv) > 1 else "/home/user/index.html"
OUTDIR = os.path.join(os.path.dirname(os.path.abspath(__file__)))
POLL = 1.5

def digest(path):
    try:
        with open(path, "rb") as f:
            return hashlib.md5(f.read()).hexdigest()
    except FileNotFoundError:
        return None

last = digest(TARGET)
print(f"[watch] izleniyor: {TARGET} (ilk hash={last})", flush=True)
while True:
    time.sleep(POLL)
    cur = digest(TARGET)
    if cur and cur != last:
        last = cur
        stamp = time.strftime("%Y%m%d-%H%M%S")
        name = f"index-{stamp}-{cur[:8]}.html"
        dst = os.path.join(OUTDIR, name)
        shutil.copy2(TARGET, dst)
        print(f"[watch] snapshot kaydedildi: versions/{name}", flush=True)
