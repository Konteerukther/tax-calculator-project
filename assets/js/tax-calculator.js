let currentStep = 1;
const taxBrackets = [
  { min: 0,       max: 150000,   rate: 0 },
  { min: 150001,  max: 300000,   rate: 0.05 },
  { min: 300001,  max: 500000,   rate: 0.10 },
  { min: 500001,  max: 750000,   rate: 0.15 },
  { min: 750001,  max: 1000000,  rate: 0.20 },
  { min: 1000001, max: 2000000,  rate: 0.25 },
  { min: 2000001, max: Infinity, rate: 0.30 }
];

function goToStep(step) {
  document.querySelectorAll(".step-content").forEach(el => el.classList.add("d-none"));
  document.querySelectorAll(".step-indicator .step").forEach(el => el.classList.remove("active"));
  document.getElementById(`step-${step}`).classList.remove("d-none");
  document.querySelectorAll(".step-indicator .step")[step - 1].classList.add("active");
  currentStep = step;
  
  if (step === 2) {
    updateStep2();
  }
  if (step === 7) {
    calculateTax();
  }
}

function getValue(id) {
  return parseFloat(document.getElementById(id).value.replace(/,/g, '')) || 0;
}

function updateStep2() {
  const salary = getValue("salary");
  const bonus = getValue("bonus");
  const otherIncome = getValue("otherIncome");
  const totalIncome = salary + bonus + otherIncome;
  
  const PersonalPaymentDeduction = Math.floor(totalIncome * 0.5);
  const PersonalPaymentDeductionFinal = Math.min(PersonalPaymentDeduction, 100000);
  
  document.getElementById("personalPaymentDeductionFinal").value = PersonalPaymentDeductionFinal.toLocaleString();
}

function calculateTax() {
  // คำนวณรายได้รวม
  const salary = getValue("salary");
  const bonus = getValue("bonus");
  const otherIncome = getValue("otherIncome");
  const totalIncome = salary + bonus + otherIncome;
  
  // ลดหย่อนส่วนบุคคล/ครอบครัว
  const personalPaymentDeductionFinal = getValue("personalPaymentDeductionFinal");
  const fixedPersonalDeduction = 60000;
  const spouseDeduction = document.getElementById("spouseEligible").checked ? 60000 : 0;
  const spouseDisabledDeduction = (document.getElementById("spouseEligible").checked && document.getElementById("spouseDisabled").checked) ? 60000 : 0;
  const pregnancyDeduction = Math.min(getValue("pregnancyDeduction"), 60000);
  
  // คำนวณลดหย่อนบุตร
  const legalChildrenOlder = parseInt(document.getElementById("legalChildrenOlder").value) || 0;
  const legalChildrenYounger = parseInt(document.getElementById("legalChildrenYounger").value) || 0;
  let totalLegalChildren = legalChildrenOlder + legalChildrenYounger;
  let legalChildrenDeduction = 0;
  if (totalLegalChildren > 0) {
    legalChildrenDeduction = 30000;
    if (totalLegalChildren > 1) {
      legalChildrenDeduction += (totalLegalChildren - 1) * 60000;
    }
  }
  const adoptedChildren = parseInt(document.getElementById("adoptedChildren").value) || 0;
  const adoptedChildrenDeduction = Math.min(adoptedChildren, 3) * 30000;
  const parentalCount = parseInt(document.getElementById("parentalCount").value) || 0;
  const parentalDeduction = Math.min(parentalCount, 4) * 30000;
  const disabilityCount = parseInt(document.getElementById("disabilityCount").value) || 0;
  const disabilityDeduction = disabilityCount * 60000;
  
  const totalPersonalDeduction = personalPaymentDeductionFinal +
                                 fixedPersonalDeduction +
                                 spouseDeduction +
                                 spouseDisabledDeduction +
                                 pregnancyDeduction +
                                 legalChildrenDeduction +
                                 adoptedChildrenDeduction +
                                 parentalDeduction +
                                 disabilityDeduction;
  
  // ลดหย่อนกลุ่มกระตุ้นเศรษฐกิจ
  const easyEReceipt = Math.min(getValue("easyEReceipt"), 50000);
  const housingInterest = Math.min(getValue("housingInterest"), 100000);
  let newHouseRaw = getValue("newHouse");
  if(newHouseRaw > 10000000) { newHouseRaw = 10000000; }
  const newHouseDeduction = Math.min(Math.floor(newHouseRaw / 1000000) * 10000, 100000);
  const provincialTour = Math.min(getValue("provincialTour"), 15000);
  const totalEconomicDeduction = easyEReceipt + housingInterest + newHouseDeduction + provincialTour;
  
  // ลดหย่อนกลุ่มประกัน/เงินออม/การลงทุน
  const socialSecurityDeduction2 = Math.min(getValue("social_for_family"), 500000);
  const socialSecurityDeduction = Math.min(getValue("socialSecurity"), 9000);
  const lifeInsuranceRaw = getValue("lifeInsurance");
  const lifeInsuranceDeduction = Math.min(lifeInsuranceRaw, 100000);
  let healthInsuranceSelfRaw = getValue("healthInsuranceSelf");
  let healthInsuranceSelfDeduction = Math.min(healthInsuranceSelfRaw, 25000);
  if (lifeInsuranceDeduction + healthInsuranceSelfDeduction > 100000) {
    healthInsuranceSelfDeduction = Math.max(0, 100000 - lifeInsuranceDeduction);
  }
  const healthInsuranceParentsDeduction = Math.min(getValue("healthInsuranceParents"), 15000);
  const spouseInsuranceRaw = getValue("spouseInsurance");
  const spouseInsuranceDeductionFinal = Math.min(spouseInsuranceRaw, 10000);
  const socialEnterpriseInvestmentDeduction = Math.min(getValue("socialEnterpriseInvestment"), 100000);
  
  const thaiESGDeduction = Math.min(getValue("thaiesgFund") * 0.3, 300000);
  const rmfDeduction = Math.min(getValue("rmfFund") * 0.3, 500000);
  const ssfDeduction = Math.min(getValue("ssfFund") * 0.3, 200000);
  const pvdDeduction = Math.min(getValue("pvdFund") * 0.15, 500000);
  const savingsDeduction = Math.min(getValue("savingsFund"), 30000);
  const pensionInsuranceDeduction = Math.min(getValue("pensionInsurance") * 0.15, 200000);
  
  let retirementGroupDeduction = rmfDeduction + ssfDeduction + pvdDeduction + savingsDeduction + pensionInsuranceDeduction;
  if (retirementGroupDeduction > 500000) {
    retirementGroupDeduction = 500000;
  }
  
  const totalInsuranceInvestmentDeduction = socialSecurityDeduction +
                                              socialSecurityDeduction2 +
                                              lifeInsuranceDeduction +
                                              healthInsuranceSelfDeduction +
                                              healthInsuranceParentsDeduction +
                                              spouseInsuranceDeductionFinal +
                                              socialEnterpriseInvestmentDeduction +
                                              thaiESGDeduction +
                                              retirementGroupDeduction;
  
  // ลดหย่อนกลุ่มเงินบริจาค
  const totalDeductionsExcludingDonation = totalPersonalDeduction + totalEconomicDeduction + totalInsuranceInvestmentDeduction;
  const netIncomeExcludingDonation = totalIncome - totalDeductionsExcludingDonation;
  const donationCap = netIncomeExcludingDonation * 0.1;
  
  const generalDonation = getValue("generalDonation");
  const educationDonation = getValue("educationDonation");
  let donationNonPolitical = generalDonation + 2 * educationDonation;
  let donationNonPoliticalEffective = Math.min(donationNonPolitical, donationCap);
  
  const politicalDonation = Math.min(getValue("politicalDonation"), 10000);
  const totalDonationDeduction = donationNonPoliticalEffective + politicalDonation;
  
  // รวมค่าลดหย่อนทั้งหมด
  const totalDeduction = totalPersonalDeduction + totalEconomicDeduction + totalInsuranceInvestmentDeduction + totalDonationDeduction;
  
  // คำนวณภาษีที่ต้องจ่าย
  let netIncome = totalIncome - totalDeduction;
  if (netIncome < 0) netIncome = 0;
  
  let tax = 0;
  let breakdown = [];
  for (let bracket of taxBrackets) {
    if (netIncome > bracket.min) {
      let taxableAmount = Math.min(netIncome, bracket.max) - bracket.min;
      let taxForBracket = Math.round(taxableAmount * bracket.rate);
      tax += taxForBracket;
      
      let bgColor = "";
      if (bracket.rate >= 0.15) {
        bgColor = "#f8d7da";
      } else if (bracket.rate === 0.10) {
        bgColor = "#fff3cd";
      }
      
      breakdown.push({
        range: `${bracket.min.toLocaleString()} - ${bracket.max === Infinity ? "ขึ้นไป" : bracket.max.toLocaleString()}`,
        rate: `${(bracket.rate * 100).toFixed(0)}%`,
        tax: taxForBracket.toLocaleString(),
        bgColor: bgColor
      });
    }
  }
  
  // แสดงผลใน Step 7
  document.getElementById("totalIncomeDisplay").innerText = totalIncome.toLocaleString();
  document.getElementById("totalDeductionDisplay").innerText = totalDeduction.toLocaleString();
  document.getElementById("netIncomeDisplay").innerText = netIncome.toLocaleString();
  document.getElementById("taxDisplay").innerText = tax.toLocaleString();
  
  let taxTableHTML = "";
  breakdown.forEach(row => {
    taxTableHTML += `<tr style="background-color: ${row.bgColor}">
                       <td>${row.range}</td>
                       <td>${row.rate}</td>
                       <td>${row.tax}</td>
                     </tr>`;
  });
  document.getElementById("taxTableBody").innerHTML = taxTableHTML;
  
  // สร้างตารางรายละเอียดลดหย่อน
  const deductionBreakdownHTML = `
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>หมวดลดหย่อน</th>
          <th>รายละเอียด</th>
          <th>จำนวนเงิน (บาท)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="9">ส่วนบุคคล/ครอบครัว</td>
          <td>ค่าใช้จ่ายเงินประเภทที่ 1 (50% ของรายได้, ไม่เกิน 100,000 บาท)</td>
          <td>${getValue("personalPaymentDeductionFinal").toLocaleString()}</td>
        </tr>
        <tr>
          <td>ค่าลดหย่อนส่วนบุคคล (60,000 บาท)</td>
          <td>${fixedPersonalDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <td>คู่สมรส (60,000 บาท)</td>
          <td>${spouseDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <td>คู่สมรสพิการ (60,000 บาท)</td>
          <td>${spouseDisabledDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <td>ฝากครรภ์และคลอดบุตร (จ่ายจริง, max 60,000)</td>
          <td>${pregnancyDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <td>บุตรชอบด้วยกฎหมาย (รวมเด็กทั้งสองกลุ่ม)</td>
          <td>${legalChildrenDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <td>บุตรบุญธรรม (สูงสุด 3 คน)</td>
          <td>${adoptedChildrenDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <td>เลี้ยงดูบิดามารดา (สูงสุด 4 คน)</td>
          <td>${parentalDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <td>อุปการะผู้พิการ/ทุพลภาพ</td>
          <td>${disabilityDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <th colspan="2">รวมค่าลดหย่อนสำหรับส่วนบุคคล/ครอบครัว</th>
          <th>${totalPersonalDeduction.toLocaleString()}</th>
        </tr>
        <tr>
          <td rowspan="4">กระตุ้นเศรษฐกิจ</td>
          <td>Easy e-Receipt 2567</td>
          <td>${easyEReceipt.toLocaleString()}</td>
        </tr>
        <tr>
          <td>ดอกเบี้ยที่อยู่อาศัย</td>
          <td>${housingInterest.toLocaleString()}</td>
        </tr>
        <tr>
          <td>ค่าสร้างบ้านใหม่ 2567-2568</td>
          <td>${newHouseDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <td>เที่ยวเมืองรอง 2567</td>
          <td>${provincialTour.toLocaleString()}</td>
        </tr>
        <tr>
          <th colspan="2">รวมค่าลดหย่อนสำหรับกระตุ้นเศรษฐกิจ</th>
          <th>${totalEconomicDeduction.toLocaleString()}</th>
        </tr>
        <tr>
          <td rowspan="12">ประกัน/เงินออม/การลงทุน</td>
          <td>ประกันสังคม</td>
          <td>${socialSecurityDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <td>เบี้ยประกันชีวิต/สะสมทรัพย์</td>
          <td>${lifeInsuranceDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <td>เบี้ยประกันสุขภาพ (ตัวเอง)</td>
          <td>${healthInsuranceSelfDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <td>เบี้ยประกันสุขภาพ (บิดามารดา)</td>
          <td>${healthInsuranceParentsDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <td>เบี้ยประกันชีวิตคู่สมรส</td>
          <td>${spouseInsuranceDeductionFinal.toLocaleString()}</td>
        </tr>
        <tr>
          <td>เงินลงทุนธุรกิจ Social Enterprise</td>
          <td>${socialEnterpriseInvestmentDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <td>กองทุน ThaiESG</td>
          <td>${thaiESGDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <td>กองทุน RMF</td>
          <td>${rmfDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <td>กองทุน SSF</td>
          <td>${ssfDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <td>กองทุน PVD/สงเคราะห์ครู</td>
          <td>${pvdDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <td>กองทุนการออมแห่งชาติ</td>
          <td>${savingsDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <td>เบี้ยประกันชีวิตแบบบำนาญ</td>
          <td>${pensionInsuranceDeduction.toLocaleString()}</td>
        </tr>
        <tr>
          <th colspan="2">รวมค่าลดหย่อนสำหรับประกัน/เงินออม/การลงทุน</th>
          <th>${totalInsuranceInvestmentDeduction.toLocaleString()}</th>
        </tr>
        <tr>
          <td rowspan="3">เงินบริจาค</td>
          <td>เงินบริจาคทั่วไป</td>
          <td>${generalDonation.toLocaleString()}</td>
        </tr>
        <tr>
          <td>เงินบริจาคเพื่อการศึกษา/กีฬา/พัฒนาสังคม (2 เท่า)</td>
          <td>${(2 * educationDonation).toLocaleString()}</td>
        </tr>
        <tr>
          <td>เงินบริจาคให้กับพรรคการเมือง</td>
          <td>${politicalDonation.toLocaleString()}</td>
        </tr>
        <tr>
          <th colspan="2">รวมค่าลดหย่อนสำหรับเงินบริจาค</th>
          <th>${totalDonationDeduction.toLocaleString()}</th>
        </tr>
        <tr>
          <th colspan="2">รวมลดหย่อนทั้งหมด</th>
          <th>${totalDeduction.toLocaleString()}</th>
        </tr>
      </tbody>
    </table>
  `;
  document.getElementById("deductionBreakdown").innerHTML = deductionBreakdownHTML;
  
  sendToMIT("Tax Calculated");
}

function formatNumberInput(input) {
  let value = input.value.replace(/,/g, '');
  if (!isNaN(value) && value !== '') {
    input.value = parseFloat(value).toLocaleString();
  }
}

document.querySelectorAll('input.format-number').forEach(input => {
  input.addEventListener('blur', () => formatNumberInput(input));
});

function toggleCollapse(id) {
  document.getElementById(id).classList.toggle("d-none");
}

document.addEventListener('DOMContentLoaded', function () {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

document.getElementById("taxForm").addEventListener("submit", function(e) {
  e.preventDefault();
  //alert("ข้อมูลถูกบันทึกแล้ว (ตัวอย่าง)");
});

// ฟังก์ชันสำหรับเก็บข้อมูลลง localStorage
function saveTaxData() {
  const taxData = {};
  document.querySelectorAll('input').forEach(input => {
    taxData[input.id] = input.value;
  });
  localStorage.setItem('taxData', JSON.stringify(taxData));
  alert('ข้อมูลถูกบันทึกลงในเครื่องแล้ว');
  sendToMIT("Data Saved");
}

// ฟังก์ชันสำหรับโหลดข้อมูลจาก localStorage
function loadTaxData() {
  const storedData = localStorage.getItem('taxData');
  if (storedData) {
    const taxData = JSON.parse(storedData);
    for (const key in taxData) {
      const input = document.getElementById(key);
      if (input) {
        input.value = taxData[key];
      }
    }
    alert('โหลดข้อมูลจากเครื่องเรียบร้อย');
    sendToMIT("Data Loaded");
  } else {
    alert('ไม่พบข้อมูลที่ถูกบันทึกไว้');
  }
}

// ฟังก์ชันโหลดไฟล์ JSON จากผู้ใช้
function loadJSON() {
  const fileInput = document.getElementById("jsonFileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("กรุณาเลือกไฟล์ก่อน!");
    return;
  }

  // ตรวจสอบให้แน่ใจว่าเป็นไฟล์ .json เท่านั้น
  if (!file.name.endsWith(".json") || file.type !== "application/json") {
    alert("กรุณาเลือกไฟล์ JSON เท่านั้น!");
    fileInput.value = ""; // ล้างค่าถ้าไฟล์ไม่ถูกต้อง
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    try {
      const jsonData = JSON.parse(event.target.result);
      console.log("Loaded JSON Data:", jsonData);
      
      // กำหนดค่าลงในฟิลด์ที่เกี่ยวข้อง
      document.getElementById('salary').value = jsonData.salary || '';
      document.getElementById('bonus').value = jsonData.bonus || '';
      document.getElementById('otherIncome').value = jsonData.otherIncome || '';
      document.getElementById('personalPaymentDeductionFinal').value = jsonData.personalPaymentDeductionFinal || '';
      document.getElementById('personalAllowance').value = jsonData.personalAllowance || '';

      // กำหนดค่าสำหรับ checkbox
      document.getElementById('spouseEligible').checked = jsonData.spouseEligible === 'on';
      document.getElementById('spouseDisabled').checked = jsonData.spouseDisabled === 'on';
      document.getElementById('togglePersonalExtra').checked = jsonData.togglePersonalExtra === 'on';

      document.getElementById('pregnancyDeduction').value = jsonData.pregnancyDeduction || '';
      document.getElementById('legalChildrenOlder').value = jsonData.legalChildrenOlder || '';
      document.getElementById('legalChildrenYounger').value = jsonData.legalChildrenYounger || '';
      document.getElementById('adoptedChildren').value = jsonData.adoptedChildren || '';
      document.getElementById('parentalCount').value = jsonData.parentalCount || '';
      document.getElementById('disabilityCount').value = jsonData.disabilityCount || '';

      document.getElementById('easyEReceipt').value = jsonData.easyEReceipt || '';
      document.getElementById('housingInterest').value = jsonData.housingInterest || '';
      document.getElementById('newHouse').value = jsonData.newHouse || '';
      document.getElementById('provincialTour').value = jsonData.provincialTour || '';

      document.getElementById('social_for_family').value = jsonData.social_for_family || '';
      document.getElementById('socialSecurity').value = jsonData.socialSecurity || '';
      document.getElementById('lifeInsurance').value = jsonData.lifeInsurance || '';
      document.getElementById('healthInsuranceSelf').value = jsonData.healthInsuranceSelf || '';
      document.getElementById('healthInsuranceParents').value = jsonData.healthInsuranceParents || '';
      document.getElementById('spouseInsurance').value = jsonData.spouseInsurance || '';

      document.getElementById('socialEnterpriseInvestment').value = jsonData.socialEnterpriseInvestment || '';
      document.getElementById('thaiesgFund').value = jsonData.thaiesgFund || '';
      document.getElementById('rmfFund').value = jsonData.rmfFund || '';
      document.getElementById('ssfFund').value = jsonData.ssfFund || '';
      document.getElementById('pvdFund').value = jsonData.pvdFund || '';
      document.getElementById('kbkFund').value = jsonData.kbkFund || '';
      document.getElementById('savingsFund').value = jsonData.savingsFund || '';
      document.getElementById('pensionInsurance').value = jsonData.pensionInsurance || '';

      document.getElementById('generalDonation').value = jsonData.generalDonation || '';
      document.getElementById('educationDonation').value = jsonData.educationDonation || '';
      document.getElementById('politicalDonation').value = jsonData.politicalDonation || '';

      console.log("JSON data loaded successfully.");
      sendToMIT("JSON Loaded");
  } catch (error) {
      console.error("Error parsing JSON:", error);
  }
  };

  reader.readAsText(file);
}

// ฟังก์ชันสำหรับดาวน์โหลดข้อมูลเป็นไฟล์ JSON
function downloadTaxData() { 
  const data = {
      salary: document.getElementById('salary')?.value || '',
      bonus: document.getElementById('bonus')?.value || '',
      otherIncome: document.getElementById('otherIncome')?.value || '',
      personalPaymentDeductionFinal: document.getElementById('personalPaymentDeductionFinal')?.value || '',
      personalAllowance: document.getElementById('personalAllowance')?.value || '',
      spouseEligible: document.getElementById('spouseEligible')?.checked ? 'on' : 'off',
      spouseDisabled: document.getElementById('spouseDisabled')?.checked ? 'on' : 'off',
      togglePersonalExtra: document.getElementById('togglePersonalExtra')?.checked ? 'on' : 'off',
      pregnancyDeduction: document.getElementById('pregnancyDeduction')?.value || '',
      legalChildrenOlder: document.getElementById('legalChildrenOlder')?.value || '',
      legalChildrenYounger: document.getElementById('legalChildrenYounger')?.value || '',
      adoptedChildren: document.getElementById('adoptedChildren')?.value || '',
      parentalCount: document.getElementById('parentalCount')?.value || '',
      disabilityCount: document.getElementById('disabilityCount')?.value || '',
      easyEReceipt: document.getElementById('easyEReceipt')?.value || '',
      housingInterest: document.getElementById('housingInterest')?.value || '',
      newHouse: document.getElementById('newHouse')?.value || '',
      provincialTour: document.getElementById('provincialTour')?.value || '',
      social_for_family: document.getElementById('social_for_family')?.value || '',
      socialSecurity: document.getElementById('socialSecurity')?.value || '',
      lifeInsurance: document.getElementById('lifeInsurance')?.value || '',
      healthInsuranceSelf: document.getElementById('healthInsuranceSelf')?.value || '',
      healthInsuranceParents: document.getElementById('healthInsuranceParents')?.value || '',
      spouseInsurance: document.getElementById('spouseInsurance')?.value || '',
      socialEnterpriseInvestment: document.getElementById('socialEnterpriseInvestment')?.value || '',
      thaiesgFund: document.getElementById('thaiesgFund')?.value || '',
      rmfFund: document.getElementById('rmfFund')?.value || '',
      ssfFund: document.getElementById('ssfFund')?.value || '',
      pvdFund: document.getElementById('pvdFund')?.value || '',
      kbkFund: document.getElementById('kbkFund')?.value || '',
      savingsFund: document.getElementById('savingsFund')?.value || '',
      pensionInsurance: document.getElementById('pensionInsurance')?.value || '',
      generalDonation: document.getElementById('generalDonation')?.value || '',
      educationDonation: document.getElementById('educationDonation')?.value || '',
      politicalDonation: document.getElementById('politicalDonation')?.value || ''
  };

  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "taxData.json";
  link.click();
  //URL.revokeObjectURL(link.href);
  sendToMIT("JSON Generated");
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