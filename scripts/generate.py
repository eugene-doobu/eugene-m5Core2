#!/usr/bin/env python3
"""
Word data skeleton generator for all 5 wordbooks (30 levels).
Reads source word lists and produces JSON files with placeholder fields.
Run: python3 scripts/generate.py
"""

import json
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(BASE, "scripts", "raw")
DATA = os.path.join(BASE, "src", "data")


# ---------------------------------------------------------------------------
# Travel English word lists (no source file – defined here)
# ---------------------------------------------------------------------------
TRAVEL_WORDS = {
    "airport": [
        "airport", "flight", "boarding pass", "gate", "terminal", "departure",
        "arrival", "check-in", "baggage", "luggage", "carry-on", "overhead bin",
        "seat belt", "aisle", "window seat", "passport", "visa", "customs",
        "immigration", "declaration", "duty-free", "transit", "layover",
        "connecting flight", "delay", "cancel", "boarding", "takeoff",
        "landing", "turbulence", "pilot", "flight attendant", "announcement",
        "security check", "metal detector", "scanner", "prohibited", "liquid",
        "restriction", "baggage claim", "conveyor belt", "lost luggage",
        "airline", "ticket", "round trip", "one-way", "economy class",
        "business class", "first class", "upgrade", "reservation", "confirm",
        "itinerary", "travel agency", "bus", "taxi", "subway", "train",
        "platform", "station", "fare", "transfer", "route", "schedule",
        "timetable", "express", "local train", "stop", "destination",
        "map", "direction", "traffic", "rush hour", "parking", "rental car",
        "driver", "highway", "toll", "gas station", "fuel", "accident",
        "speed limit", "intersection", "crosswalk", "sidewalk", "bridge",
        "tunnel", "ferry", "harbor", "cruise", "bicycle", "scooter",
        "helmet", "navigation", "GPS", "detour", "pedestrian",
        "departure lounge", "arrival hall", "check-out", "trolley", "porter",
        "e-ticket", "mobile boarding",
    ],
    "hotel": [
        "hotel", "reservation", "check-in", "check-out", "front desk", "lobby",
        "room key", "key card", "single room", "double room", "suite",
        "twin room", "bed", "pillow", "blanket", "mattress", "sheet",
        "towel", "bathrobe", "slippers", "mini bar", "room service",
        "wake-up call", "do not disturb", "housekeeping", "laundry",
        "dry cleaning", "iron", "hanger", "wardrobe", "air conditioning",
        "heater", "thermostat", "Wi-Fi", "outlet", "adapter", "bathroom",
        "shower", "bathtub", "toilet", "hot water", "hairdryer",
        "shampoo", "soap", "toiletries", "amenities", "elevator", "stairs",
        "floor", "corridor", "emergency exit", "fire escape", "safe",
        "deposit box", "parking", "valet parking", "bellboy", "concierge",
        "porter", "tip", "receipt", "bill", "rate", "discount",
        "complimentary", "breakfast", "buffet", "swimming pool", "gym",
        "spa", "sauna", "balcony", "view", "ocean view", "city view",
        "noise complaint", "maintenance", "repair", "clogged", "leak",
        "upgrade", "late check-out", "early check-in", "luggage storage",
        "lost and found", "non-smoking room", "crib", "fully booked",
        "available", "guest", "identity card", "passport", "cancel",
        "extend stay", "overcharge", "refund", "bed bug",
    ],
    "restaurant": [
        "restaurant", "menu", "order", "appetizer", "main course", "dessert",
        "beverage", "water", "juice", "coffee", "tea", "wine", "beer",
        "cocktail", "soft drink", "ice", "straw", "napkin", "plate",
        "bowl", "cup", "glass", "fork", "knife", "spoon", "chopsticks",
        "tray", "table", "chair", "booth", "waiter", "waitress",
        "chef", "cashier", "host", "reservation", "waiting list",
        "seat", "outdoor seating", "smoking section", "non-smoking",
        "bill", "check", "tip", "service charge", "receipt",
        "credit card", "cash", "split the bill", "takeout", "delivery",
        "dine-in", "buffet", "brunch", "portion", "serving",
        "ingredient", "spicy", "mild", "sweet", "sour", "salty",
        "bitter", "savory", "bland", "fresh", "raw", "grilled",
        "fried", "baked", "steamed", "roasted", "boiled",
        "vegetarian", "vegan", "gluten-free", "allergy",
        "dairy-free", "organic", "signature dish", "side dish",
        "salad", "soup", "pasta", "steak", "seafood",
        "well-done", "medium rare", "rare", "sauce", "condiment",
        "refill", "doggy bag", "sold out", "complimentary",
        "last order", "bon appétit",
    ],
    "shopping": [
        "shop", "store", "shopping mall", "market", "price", "cost",
        "expensive", "cheap", "bargain", "sale", "discount", "coupon",
        "cash", "credit card", "debit card", "contactless payment",
        "receipt", "change", "exchange rate", "currency", "ATM",
        "withdraw", "dollar", "euro", "pound", "size", "small",
        "medium", "large", "extra large", "fitting room", "try on",
        "fit", "tight", "loose", "color", "style", "brand",
        "quality", "material", "cotton", "silk", "leather", "wool",
        "souvenir", "gift", "bag", "plastic bag", "gift wrap",
        "shoes", "boots", "sneakers", "accessories", "jewelry",
        "necklace", "bracelet", "sunglasses", "hat", "wallet",
        "backpack", "suitcase", "refund", "return", "exchange",
        "warranty", "defective", "tax-free", "duty-free",
        "customs declaration", "import limit", "shipping",
        "delivery", "fragile", "aisle", "shelf", "counter",
        "cashier", "checkout", "barcode", "queue", "vendor",
        "haggle", "negotiation", "in stock", "sold out",
        "order online", "pickup", "tracking number",
    ],
    "sightseeing": [
        "museum", "art gallery", "exhibition", "temple", "cathedral",
        "church", "monument", "landmark", "palace", "castle", "ruins",
        "statue", "fountain", "bridge", "tower", "square", "park",
        "garden", "beach", "mountain", "lake", "river", "waterfall",
        "cave", "island", "cliff", "valley", "forest", "volcano",
        "sunrise", "sunset", "scenery", "viewpoint", "panorama",
        "photograph", "camera", "tourist", "guided tour", "audio guide",
        "admission fee", "entrance ticket", "opening hours", "closed",
        "student discount", "map", "directions", "left", "right",
        "straight ahead", "turn", "block", "corner", "across from",
        "next to", "nearby", "distance", "walking", "lost",
        "information center", "brochure", "itinerary", "booking",
        "police", "police station", "hospital", "ambulance",
        "pharmacy", "doctor", "emergency", "accident", "help",
        "danger", "safe", "embassy", "consulate", "travel insurance",
        "stolen", "first aid", "allergy", "medicine", "prescription",
        "heritage site", "architecture", "ancient", "historic",
        "local festival", "traditional market", "crowd", "queue",
        "cable car", "pedestrian zone",
    ],
}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def read_words(filepath):
    with open(filepath, encoding="utf-8") as f:
        return [line.strip() for line in f if line.strip()]


def make_entry(word_id, word):
    return {
        "id": word_id,
        "word": word,
        "pronunciation": "",
        "partOfSpeech": "",
        "meaning": "",
        "exampleEn": "",
        "exampleKo": "",
    }


def generate_level(words, id_prefix, start_num=1):
    return [
        make_entry(f"{id_prefix}-{start_num + i:03d}", word)
        for i, word in enumerate(words)
    ]


def write_json(filepath, data):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"  ✓ {os.path.relpath(filepath, BASE)}  ({len(data)} words)")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("=== Word Skeleton Generator ===\n")

    # ── 1. frequency-english (NGSL, 2809 words → 10 levels of 281) ────────
    print("[1/5] frequency-english (NGSL)...")
    ngsl = read_words(os.path.join(RAW, "ngsl.txt"))
    chunk = 281
    for lv in range(1, 11):
        start = (lv - 1) * chunk
        end = start + chunk if lv < 10 else len(ngsl)
        entries = generate_level(ngsl[start:end], f"freq-lv{lv}")
        write_json(os.path.join(DATA, "frequency-english", f"words-level-{lv}.json"), entries)

    # ── 2. toeic-essential (TSL, 1250 words → 5 levels of 250) ───────────
    print("\n[2/5] toeic-essential (TSL)...")
    tsl = read_words(os.path.join(RAW, "tsl.txt"))
    chunk = 250
    for lv in range(1, 6):
        start = (lv - 1) * chunk
        end = start + chunk if lv < 5 else len(tsl)
        entries = generate_level(tsl[start:end], f"toeic-lv{lv}")
        write_json(os.path.join(DATA, "toeic-essential", f"words-level-{lv}.json"), entries)

    # ── 3. travel-english (defined above → 5 topics of 100) ──────────────
    print("\n[3/5] travel-english (inline lists)...")
    for topic, words in TRAVEL_WORDS.items():
        entries = generate_level(words, f"travel-{topic}")
        write_json(os.path.join(DATA, "travel-english", f"words-{topic}.json"), entries)

    # ── 4. business-english (BSL, 1744 words → 6 levels of ~291) ─────────
    print("\n[4/5] business-english (BSL)...")
    bsl = read_words(os.path.join(RAW, "bsl.txt"))
    chunk = 291
    for lv in range(1, 7):
        start = (lv - 1) * chunk
        end = start + chunk if lv < 6 else len(bsl)
        entries = generate_level(bsl[start:end], f"biz-lv{lv}")
        write_json(os.path.join(DATA, "business-english", f"words-level-{lv}.json"), entries)

    # ── 5. academic-english (NAWL, 963 words → 4 levels of ~241) ─────────
    print("\n[5/5] academic-english (NAWL)...")
    nawl = read_words(os.path.join(RAW, "nawl.txt"))
    chunk = 241
    for lv in range(1, 5):
        start = (lv - 1) * chunk
        end = start + chunk if lv < 4 else len(nawl)
        entries = generate_level(nawl[start:end], f"acad-lv{lv}")
        write_json(os.path.join(DATA, "academic-english", f"words-level-{lv}.json"), entries)

    # ── Summary ────────────────────────────────────────────────────────────
    total_words = 0
    total_files = 0
    for dirpath, _, files in os.walk(DATA):
        for fname in files:
            if fname.startswith("words-") and fname.endswith(".json"):
                fp = os.path.join(dirpath, fname)
                with open(fp, encoding="utf-8") as fh:
                    total_words += len(json.load(fh))
                total_files += 1

    print(f"\n=== Done ===")
    print(f"Files: {total_files}/30")
    print(f"Total word entries: {total_words:,}")
    print("\nNext step: fill in pronunciation/meaning/examples using the add-words skill.")


if __name__ == "__main__":
    main()
