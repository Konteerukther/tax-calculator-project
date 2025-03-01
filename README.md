# Tax Calculator Project

## 📌 Overview
โครงการนี้เป็น **เว็บคำนวณภาษี** ที่สามารถฝังลงใน MIT App Inventor ได้ โดยมีฟีเจอร์ต่าง ๆ ดังนี้:

- ✅ คำนวณภาษีพื้นฐาน
- 📚 เมนูให้ความรู้เกี่ยวกับภาษี
- ⚠️ คิดค่าปรับภาษี
- 💾 บันทึกข้อมูลภาษีย้อนหลัง
- 🖨️ สั่งพิมพ์หน้าเว็บได้

---

## 📂 Project Structure

```
/tax-calculator-project
│── /assets
│   │── /css
│   │   ├── style.css          # (ไฟล์สไตล์หลักของเว็บ)
│   │   ├── figma-styles.css   # (สไตล์จาก Figma Dev Mode)
│── /js
│   │   ├── tax-calculator.js  # (ฟังก์ชันคำนวณภาษี)
│   │   ├── tax-storage.js     # (บันทึกข้อมูลภาษีย้อนหลัง)
│   │   ├── tax-penalty.js     # (คิดค่าปรับ)
│── /images                    # (เก็บรูปภาพที่ใช้ในเว็บ)
│── /components                 # (โฟลเดอร์สำหรับไฟล์ที่แยกจาก Figma)
│   │── navbar.html             # (แถบเมนู)
│   │── footer.html             # (ส่วนท้ายเว็บ)
│   │── calculator-section.html  # (ส่วน UI ของเครื่องคำนวณภาษี)
│── index.html                 # (หน้าเว็บหลัก)
│── tax-info.html              # (เมนูให้ความรู้เกี่ยวกับภาษี)
│── print-page.html            # (หน้าสำหรับสั่งพิมพ์ข้อมูล)
│── README.md                  # (คำอธิบายโปรเจกต์)
```

---

## 🚀 Git Branch Strategy

| Branch | หน้าที่หลัก | ไฟล์ที่เกี่ยวข้อง | ผู้รับผิดชอบ |
|---------|-------------|-------------------|---------------|
| `main` | **Branch หลัก** รวมโค้ดที่ผ่านการตรวจสอบแล้วและพร้อมใช้งาน | - | (ทุกคน) |
| `dev` | **Branch สำหรับพัฒนา** ใช้รวมโค้ดจากทุกฟีเจอร์ก่อน merge ไป `main` | - | (ทุกคน) |
| `feature/ui` | **UI & Layout** ใช้พัฒนาส่วน UI ที่ได้จาก Figma | `/index.html`, `/assets/css/figma-styles.css`, `/components/*` | ทีม UI |
| `feature/calculator` | **คำนวณภาษี** พัฒนาฟังก์ชันคำนวณ | `/assets/js/tax-calculator.js` | ทีมคำนวณ |
| `feature/storage` | **บันทึกข้อมูลภาษีย้อนหลัง** ใช้พัฒนาการจัดเก็บข้อมูล | `/assets/js/tax-storage.js` | ทีมจัดเก็บข้อมูล |
| `feature/penalty` | **คิดค่าปรับ** ใช้พัฒนาฟังก์ชันคิดค่าปรับ | `/assets/js/tax-penalty.js` | ทีมค่าปรับ |
| `feature/print` | **สั่งพิมพ์** ใช้พัฒนาหน้าสำหรับพิมพ์ | `/print-page.html` | ทีมพิมพ์ |

---

## 💡 วิธีการทำงานกับ Git

### 1️⃣ Clone โปรเจกต์
```sh
git clone [repository-url]
cd tax-calculator-project
```

### 2️⃣ เลือก Branch สำหรับฟีเจอร์ที่ต้องการ
```sh
git checkout feature/ชื่อฟีเจอร์
```

### 3️⃣ Commit และ Push
```sh
git add .
git commit -m "เพิ่มฟีเจอร์: คำอธิบายสิ่งที่ทำ"
git push origin feature/ชื่อฟีเจอร์
```

### 4️⃣ Merge กลับ `dev`
1. เปิด **Pull Request (PR)** บน GitHub
2. ให้เพื่อนร่วมทีมช่วยรีวิว
3. Merge ไปที่ `dev`

### 5️⃣ รวม `dev` เข้า `main` เมื่อโค้ดสมบูรณ์
```sh
git checkout main
git merge dev
git push origin main
```

---

## 🔗 การพัฒนาเพิ่มเติม
หากต้องการเพิ่มฟีเจอร์หรือแก้ไข สามารถสร้าง **issue** หรือ **pull request** ได้เลย!

### 📞 ติดต่อทีม
- ทีม UI & Figma: @UI-Team
- ทีมคำนวณภาษี: @Tax-Logic
- ทีมจัดเก็บข้อมูล: @Data-Team
- ทีมค่าปรับภาษี: @Penalty-Team
- ทีมพิมพ์ข้อมูล: @Print-Team

---

🎯 **พร้อมใช้งานแล้ว! อย่าลืมทดสอบและส่ง Feedback กลับมานะครับ** 🚀
