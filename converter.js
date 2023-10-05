function convertCode() 
{
	const length = parseInt(document.getElementById('length').value);
    let trueValue, originalCode, inverseCode, complementCode;
  
    if (document.getElementById('trueValueRadio').checked) 
    {
        trueValue = parseInt(document.getElementById('trueValue').value);
        originalCode = getOriginalCode(trueValue, length);
        inverseCode = getInverseCode(originalCode);
        complementCode = getComplementCode(inverseCode);
    } 
    else if (document.getElementById('originalCodeRadio').checked) 
    {
        originalCode = document.getElementById('originalCode').value;
        trueValue = getTrueValueFromOriginal(originalCode);
        inverseCode = getInverseCode(originalCode);
        complementCode = getComplementCode(inverseCode);
    } 
    else if (document.getElementById('inverseCodeRadio').checked) 
    {
        inverseCode = document.getElementById('inverseCode').value;
        originalCode = getOriginalFromInverse(inverseCode);
        trueValue = getTrueValueFromOriginal(originalCode);
        complementCode = getComplementCode(inverseCode);
    } 
    else if (document.getElementById('complementCodeRadio').checked) 
    {
        complementCode = document.getElementById('complementCode').value;
        inverseCode = getInverseFromComplement(complementCode);
        originalCode = getOriginalFromInverse(inverseCode);
        trueValue = getTrueValueFromOriginal(originalCode);
    }
  
    document.getElementById('trueValue').value = trueValue;
    document.getElementById('originalCode').value = originalCode;
    document.getElementById('inverseCode').value = inverseCode;
    document.getElementById('complementCode').value = complementCode;
}
  
function getOriginalCode(trueValue, length) 
{
    const sign = trueValue < 0 ? '1' : '0';
    const magnitude = Math.abs(trueValue).toString(2).padStart(length - 1, '0');
    return sign + magnitude;
}

function getInverseCode(originalCode) {
    const signBit = originalCode.charAt(0);
    if (signBit === '0') return originalCode;
    const magnitudeBits = originalCode.slice(1).split('').map(bit => (bit === '0' ? '1' : '0')).join('');
    return signBit + magnitudeBits;
}

function getComplementCode(inverseCode) 
{
    if (inverseCode.charAt(0) === '0') return inverseCode;
    let carry = 1;
    let complementCode = '';
    for (let i = inverseCode.length - 1; i >= 0; i--) {
        const bit = parseInt(inverseCode.charAt(i));
        const sum = bit ^ carry;
        carry = bit & carry;
        complementCode = sum.toString() + complementCode;
    }
    return complementCode;
}

function getTrueValueFromOriginal(originalCode) 
{
    const sign = originalCode.charAt(0) === '1' ? -1 : 1;
    const magnitude = parseInt(originalCode.substring(1), 2);
    return sign * magnitude;
}

function getOriginalFromInverse(inverseCode) 
{
    const signBit = inverseCode.charAt(0);
    if (signBit === '0') return inverseCode;
    const magnitudeBits = inverseCode.slice(1).split('').map(bit => (bit === '0' ? '1' : '0')).join('');
    return signBit + magnitudeBits;
}

function getInverseFromComplement(complementCode) {
    if (complementCode.charAt(0) === '0') return complementCode;
    let carry = 1;
    let inverseCode = '';
    for (let i = complementCode.length - 1; i >= 0; i--) {
        const bit = parseInt(complementCode.charAt(i));
        const sum = bit ^ carry;
        carry = bit & carry;
        inverseCode = sum.toString() + inverseCode;
    }
    return inverseCode;
}
  