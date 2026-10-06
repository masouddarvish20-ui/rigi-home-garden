# RIGI Scroll Hero Starter

شروع سایت RIGI با انیمیشن ساخت خانه که مستقیماً با اسکرول کنترل می‌شود.

## اجرا
```bash
npm install
npm run dev
```
سپس `http://localhost:3000` را باز کنید.

## شامل
- 144 فریم WebP بهینه‌شده شامل مقدمه ابری و توالی ساخت اصلی
- Next.js App Router
- GSAP ScrollTrigger
- Hero تمام‌صفحه و pinned
- اسکرول رو به پایین = ساخت خانه جلو می‌رود
- اسکرول رو به بالا = ساخت خانه برعکس می‌شود
- متن‌های مرحله‌ای و CTA نهایی
- فایل MP4 اصلی در `public/video/rigi-build.mp4`

## نقاط تقریبی انیمیشن
- 0–20%: زمین خالی
- 20–40%: آماده‌سازی و فونداسیون
- 40–65%: اسکلت
- 65–82%: تکمیل نما
- 82–100%: خانه نهایی


## V2 changes
- Re-extracted all 120 frames at native 1920x1080 with high-quality WebP encoding.
- Added an initial RIGI brand title on the opening frame.
- Reduced the dark overlay so the footage remains brighter and sharper.

## V3 changes
- Kept the native 1920x1080 frame sequence from V2.
- Made the opening RIGI brand more prominent and kept it visible longer before the build begins.
- Reduced the dark overlay again so the source footage stays brighter.
- Simplified the middle-story copy to two short moments.
- Brought the RIGI brand back on the completed-home frame.
- Shows CTAs only at the end of the construction sequence.
- Enabled high-quality canvas image smoothing.

## V4 changes
- Added a 24-frame cinematic cloud-to-neighborhood aerial introduction.
- Preserved the original 120-frame construction sequence after the intro.
- Extended the final roof completion across eight late-stage frames.
- Updated the scroll timing for the 144-frame sequence.
