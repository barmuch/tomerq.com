
const konversiJamKeTeks = (jam, menit) => {
    if (jam === '' || menit === '') {
        return 'Silahkan isi jam dan menit.';
    }

    let jamNum = parseInt(jam, 10);
    const menitNum = parseInt(menit, 10);

    if (isNaN(jamNum) || isNaN(menitNum) || jamNum < 0 || jamNum > 24 || menitNum < 0 || menitNum > 59) {
        return 'Invalid input. Masukkan jam dan menit yang benar';
    }
    if (jamNum > 12) {
        jamNum -= 12;
    }

    const turkishJam0 = [
        "sıfır", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz", "on", "on bir", "on iki"
    ];

    const turkishJam1 = {
        0: "sıfır", 1: "biri", 2: "ikiyi", 3: "üçü", 4: "dördü",
        5: "beşi", 6: "altıyı", 7: "yediyi", 8: "sekizi", 9: "dokuzu",
        10: "onu", 11: "on biri", 12: "on ikiyi"
    };

    const turkishJam2 = {
        0: "sıfır", 1: "bire", 2: "ikiye", 3: "üçe", 4: "dörde",
        5: "beşe", 6: "altıya", 7: "yediye", 8: "sekize", 9: "dokuza",
        10: "ona", 11: "on bire", 12: "on ikiye"
    };

    const turkishMinutes = {
        0: "", 1: "bir", 2: "iki", 3: "üç", 4: "dört",
        5: "beş", 6: "altı", 7: "yedi", 8: "sekiz", 9: "dokuz",
        10: "on", 11: "on bir", 12: "on iki", 13: "on üç", 14: "on dört",
        15: "çeyrek", 16: "on altı", 17: "on yedi", 18: "on sekiz", 19: "on dokuz",
        20: "yirmi", 21: "yirmi bir", 22: "yirmi iki", 23: "yirmi üç", 24: "yirmi dört",
        25: "yirmi beş", 26: "yirmi altı", 27: "yirmi yedi", 28: "yirmi sekiz", 29: "yirmi dokuz",
        30: "buçuk", 31: "otuz bir", 32: "otuz iki", 33: "otuz üç", 34: "otuz dört",
        35: "otuz beş", 36: "otuz altı", 37: "otuz yedi", 38: "otuz sekiz", 39: "otuz dokuz",
        40: "kırk", 41: "kırk bir", 42: "kırk iki", 43: "kırk üç", 44: "kırk dört",
        45: "çeyrek", 46: "kırk altı", 47: "kırk yedi", 48: "kırk sekiz", 49: "kırk dokuz",
        50: "elli", 51: "elli bir", 52: "elli iki", 53: "elli üç", 54: "elli dört",
        55: "elli beş", 56: "elli altı", 57: "elli yedi", 58: "elli sekiz", 59: "elli dokuz"
    };

    let hasil;

    if (menitNum == 0) {
        hasil = `saat ${turkishJam0[jamNum]}`;
    } else if (menitNum < 30) {
        hasil = `saat ${turkishJam1[jamNum]} ${turkishMinutes[menitNum]} geçiyor `;
    } else if (menitNum === 30) {
        hasil = `saat ${turkishJam0[jamNum]} ${turkishMinutes[menitNum]}`;
    } else {
        const nextHour = jamNum + 1;
        const remainingMinutes = 60 - menitNum;
        hasil = `saat ${turkishJam2[nextHour]} ${turkishMinutes[remainingMinutes]} var `;
    }

    return hasil;
}

export default konversiJamKeTeks