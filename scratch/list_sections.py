import re

file_path = r"c:\yora\yora\src\app\home\page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines, 1):
    # Match comments like {/* 1. Announcement Bar */} or // 1. ...
    match = re.search(r'(?:\{/\*|//)\s*(\d+\..*?)(?:\*/\}|$)', line)
    if match:
        print(f"Line {i}: {match.group(1).strip()}")
