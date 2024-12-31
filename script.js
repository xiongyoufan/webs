// 个人所得税起征点
const TAX_THRESHOLD = 5000 * 12; // 每月5000元，年化

// 个人所得税税率表
const TAX_RATES = [
    { min: 0, max: 36000, rate: 0.03, deduction: 0 },
    { min: 36000, max: 144000, rate: 0.1, deduction: 2520 },
    { min: 144000, max: 300000, rate: 0.2, deduction: 16920 },
    { min: 300000, max: 420000, rate: 0.25, deduction: 31920 },
    { min: 420000, max: 660000, rate: 0.3, deduction: 52920 },
    { min: 660000, max: 960000, rate: 0.35, deduction: 85920 },
    { min: 960000, max: Infinity, rate: 0.45, deduction: 181920 }
];

function calculate() {
    // 获取用户输入
    const income = parseFloat(document.getElementById('income').value);
    const pension = parseFloat(document.getElementById('pension').value);
    const insurance = parseFloat(document.getElementById('insurance').value);
    const deduction = parseFloat(document.getElementById('deduction').value);

    // 计算应纳税所得额（不扣除养老金）
    const taxableIncome = income - TAX_THRESHOLD - insurance - deduction;

    // 计算应缴税额
    const tax = calculateTax(taxableIncome);

    // 计算节税金额
    const taxSaving = pension * getTaxRate(taxableIncome);

    // 更新页面显示
    document.getElementById('taxable-income').textContent = taxableIncome.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('tax-saving').textContent = taxSaving.toFixed(2);
}

function calculateTax(taxableIncome) {
    if (taxableIncome <= 0) return 0;

    const rateInfo = TAX_RATES.find(rate => 
        taxableIncome > rate.min && taxableIncome <= rate.max
    );

    return taxableIncome * rateInfo.rate - rateInfo.deduction;
}

function getTaxRate(taxableIncome) {
    if (taxableIncome <= 0) return 0;

    const rateInfo = TAX_RATES.find(rate => 
        taxableIncome > rate.min && taxableIncome <= rate.max
    );

    return rateInfo.rate;
}
