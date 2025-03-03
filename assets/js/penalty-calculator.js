function calculatePenalty() {
    // ดึงค่าจากฟอร์ม
    const baseTax = parseFloat(document.getElementById('baseTax').value) || 0;
    const daysLate = parseInt(document.getElementById('daysLate').value) || 0;
    
    // กำหนดค่าปรับคงที่สำหรับบุคคลธรรมดา:
    // ถ้าชำระล่าช้าไม่เกิน 7 วัน: ค่าปรับ 100 บาท, ถ้าเกิน 7 วัน: ค่าปรับ 200 บาท
    let fixedPenalty = daysLate <= 7 ? 100 : 200;
    
    // คำนวณเงินเพิ่ม (ดอกเบี้ย) โดยคิดที่ 1.5% ต่อเดือน
    // เศษของเดือนนับเป็น 1 เดือน (ใช้ Math.ceil)
    const monthsLate = Math.ceil(daysLate / 30) || 0;
    const additionalInterest = baseTax * 0.015 * monthsLate;
    
    // คำนวณรวมค่าปรับทั้งหมด
    const totalPenalty = fixedPenalty + additionalInterest;
    
    // สร้างตารางแสดงผลรายละเอียด
    let breakdownHTML = `
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>รายการ</th>
            <th>จำนวน (บาท)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ภาษีที่ต้องชำระ (Base Tax)</td>
            <td>${baseTax.toLocaleString()}</td>
          </tr>
          <tr>
            <td>จำนวนวันที่ล่าช้า</td>
            <td>${daysLate}</td>
          </tr>
          <tr>
            <td>ค่าปรับคงที่ (${daysLate <= 7 ? 'ภายใน 7 วัน' : 'เกิน 7 วัน'})</td>
            <td>${fixedPenalty.toLocaleString()}</td>
          </tr>
          <tr>
            <td>เงินเพิ่ม (ดอกเบี้ย 1.5% ต่อเดือน, ${monthsLate} เดือน)</td>
            <td>${additionalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
          </tr>
          <tr>
            <th>รวมค่าปรับ</th>
            <th>${totalPenalty.toLocaleString(undefined, { maximumFractionDigits: 2 })}</th>
          </tr>
        </tbody>
      </table>
    `;
    
    document.getElementById('result').innerHTML = breakdownHTML;
}

function sendToMIT(message) {
  console.log("Sending to MIT App Inventor:", message);
  if (window.AppInventor) {
  window.AppInventor.setWebViewString(message);
  }
}

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})