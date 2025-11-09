#!/usr/bin/env python3
"""
Script to download car images from dummy_ads.json
Images are sourced from Unsplash (CC0 License - Free to use)
"""

import json
import os
import urllib.request
import time
from pathlib import Path

def download_images():
    """Download all images from the JSON file"""

    # Paths
    json_path = Path("data/dummy_ads.json")
    images_dir = Path("public/images/dummy")

    # Create images directory if it doesn't exist
    images_dir.mkdir(parents=True, exist_ok=True)

    # Load JSON data
    print(f"Loading ads from {json_path}...")
    with open(json_path, 'r', encoding='utf-8') as f:
        ads = json.load(f)

    print(f"Found {len(ads)} ads")

    # Track statistics
    total_images = 0
    downloaded = 0
    skipped = 0
    failed = 0

    # Download images for each ad
    for ad in ads:
        ad_id = ad['id']
        print(f"\nProcessing ad {ad_id}: {ad['title']}")

        for idx, image_url in enumerate(ad['images'], 1):
            total_images += 1

            # Generate filename
            brand = ad['brand'].lower().replace(' ', '_')
            model = ad['model'].lower().replace(' ', '_')
            filename = f"{ad_id}_{brand}_{model}_{idx}.jpg"
            filepath = images_dir / filename

            # Skip if file already exists
            if filepath.exists():
                print(f"  ✓ Already exists: {filename}")
                skipped += 1
                continue

            # Download image
            try:
                print(f"  ↓ Downloading: {filename}...")

                # Add headers to mimic browser request
                req = urllib.request.Request(
                    image_url,
                    headers={
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    }
                )

                with urllib.request.urlopen(req, timeout=30) as response:
                    image_data = response.read()

                # Save image
                with open(filepath, 'wb') as f:
                    f.write(image_data)

                print(f"  ✓ Downloaded: {filename} ({len(image_data)} bytes)")
                downloaded += 1

                # Small delay to be respectful to the server
                time.sleep(0.5)

            except Exception as e:
                print(f"  ✗ Failed to download {filename}: {str(e)}")
                failed += 1

    # Print summary
    print("\n" + "="*60)
    print("DOWNLOAD SUMMARY")
    print("="*60)
    print(f"Total images:     {total_images}")
    print(f"Downloaded:       {downloaded}")
    print(f"Already existed:  {skipped}")
    print(f"Failed:           {failed}")
    print("="*60)

    if failed > 0:
        print("\n⚠️  Some images failed to download. You may want to retry or")
        print("   manually download them from the URLs in dummy_ads.json")

    print("\n✅ Image download process completed!")
    print(f"   Images saved to: {images_dir.absolute()}")
    print("\nNOTE: All images are from Unsplash and are licensed under CC0")
    print("      (Free to use, no attribution required)")
    print("      Source: https://unsplash.com/license")

def update_json_with_local_paths():
    """Update JSON to use local image paths instead of URLs"""

    json_path = Path("data/dummy_ads.json")

    print("\n" + "="*60)
    print("UPDATING JSON WITH LOCAL PATHS")
    print("="*60)

    with open(json_path, 'r', encoding='utf-8') as f:
        ads = json.load(f)

    for ad in ads:
        ad_id = ad['id']
        brand = ad['brand'].lower().replace(' ', '_')
        model = ad['model'].lower().replace(' ', '_')

        # Update image paths to local
        local_images = []
        for idx in range(1, len(ad['images']) + 1):
            filename = f"{ad_id}_{brand}_{model}_{idx}.jpg"
            local_images.append(f"images/dummy/{filename}")

        ad['images'] = local_images

    # Save updated JSON
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(ads, f, indent=2, ensure_ascii=False)

    print(f"✅ Updated {len(ads)} ads with local image paths")
    print(f"   JSON saved to: {json_path.absolute()}")

if __name__ == "__main__":
    print("="*60)
    print("AUTODEALAFRICA - IMAGE DOWNLOADER")
    print("="*60)
    print("\nThis script will download all car images from Unsplash")
    print("and save them to public/images/dummy/")
    print("\nLicense: All images are CC0 (Free to use)")
    print("Source: Unsplash (https://unsplash.com)")
    print("="*60)

    # Download images
    download_images()

    # Ask if user wants to update JSON with local paths
    print("\n" + "="*60)
    response = input("\nDo you want to update JSON with local paths? (y/n): ").strip().lower()

    if response == 'y':
        update_json_with_local_paths()
        print("\n✅ All done! Your JSON now points to local images.")
    else:
        print("\n✅ All done! JSON still uses online URLs.")

    print("\n" + "="*60)
    print("You can now open index.html to see your car listings!")
    print("="*60)
