#!/usr/bin/env python3
"""Final patch: academic-L1 (4) + academic-L2 (2) remaining"""
import json, glob

DICT_FINAL = {
    "mutation": ("/mjuːˈteɪʃən/", "명사", "돌연변이, 변이", "A gene mutation was detected.", "유전자 돌연변이가 발견됐다."),
    "maternal": ("/məˈtɜːrnəl/", "형용사", "모성의, 어머니의", "Maternal health was prioritized.", "모성 건강이 우선시됐다."),
    "neural": ("/ˈnjʊərəl/", "형용사", "신경의", "Neural networks process data.", "신경망이 데이터를 처리한다."),
    "consciousness": ("/ˈkɒnʃəsnəs/", "명사", "의식", "Consciousness research is complex.", "의식 연구는 복잡하다."),
    "pi": ("/paɪ/", "명사", "파이 (π)", "Pi equals approximately 3.14159.", "파이는 약 3.14159이다."),
    "articulate": ("/ɑːrˈtɪkjʊlɪt/", "형용사", "명확하게 표현하는", "An articulate speaker led the seminar.", "명확하게 표현하는 발표자가 세미나를 이끌었다."),
}


def patch_files():
    files = sorted(glob.glob("src/data/**/*.json", recursive=True))
    total = 0
    for filepath in files:
        with open(filepath, encoding="utf-8") as f:
            entries = json.load(f)
        changed = 0
        for entry in entries:
            word = entry.get("word", "")
            key = word.lower()
            if entry.get("meaning", "") in ("", word):
                if key in DICT_FINAL:
                    pron, pos, meaning, ex_en, ex_ko = DICT_FINAL[key]
                    entry["pronunciation"] = pron
                    entry["partOfSpeech"] = pos
                    entry["meaning"] = meaning
                    entry["exampleEn"] = ex_en
                    entry["exampleKo"] = ex_ko
                    changed += 1
        if changed:
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(entries, f, ensure_ascii=False, indent=2)
            print(f"  ✓ {filepath}: +{changed} patched")
        total += changed
    print(f"\n=== Done. Total patched: {total} ===")


if __name__ == "__main__":
    print("=== Patching with fill_final.py ===\n")
    patch_files()
