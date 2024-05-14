const convertSimdikiZaman = (input) => {
    // Validasi input user harus ada kata "mak" atau "mek"
    if (!input.includes("mak") && !input.includes("mek")) {
        return "Input tidak valid. Harus mengandung kata 'mak' atau 'mek'.";
    }

    const specialCases = {
        'gitmek': 'gidiyor',
        'etmek': 'ediyor',
        'tatmak': 'tadıyor',
        'gütmek': 'güdüyor'
    };

    if (specialCases[input.toLowerCase()]) {
        return specialCases[input.toLowerCase()];
    }
    // Menghapus 3 huruf terakhir dari input
    const kataDasar = input.slice(0, -3);

    // Mendapatkan huruf terakhir dari kata dasar
    const lastChar = kataDasar.charAt(kataDasar.length - 1);

    let convertedWord = "";

    // Jika huruf terakhir konsonan
    if ("bcçdfgğhjklmnprsştvyz".includes(lastChar.toLowerCase())) {
        // Mendapatkan huruf vokal terakhir
        const lastVowel = kataDasar.match(/[aeıioöuü]/gi).pop();

        // Menambahkan sufiks sesuai aturan
        switch (lastVowel.toLowerCase()) {
            case 'a':
            case 'ı':
                convertedWord = kataDasar + 'ıyor';
                break;
            case 'e':
            case 'i':
                convertedWord = kataDasar + 'iyor';
                break;
            case 'o':
            case 'u':
                convertedWord = kataDasar + 'uyor';
                break;
            case 'ö':
            case 'ü':
                convertedWord = kataDasar + 'üyor';
                break;
        }
    } 
    // Jika huruf terakhir vokal
    else if ("aeıioöuü".includes(lastChar.toLowerCase())) {
        // Jika akhirannya huruf a atau e
        if (lastChar.toLowerCase() === 'a' || lastChar.toLowerCase() === 'e') {
            // Menghapus huruf terakhir
            const kataDasarTanpaAkhiran = kataDasar.slice(0, -1);

            // Mendapatkan huruf vokal terakhir
            const lastVowel = kataDasarTanpaAkhiran.match(/[aeıioöuü]/gi).pop();

            // Menambahkan sufiks sesuai aturan
            switch (lastVowel.toLowerCase()) {
                case 'a':
                case 'ı':
                    convertedWord = kataDasarTanpaAkhiran + 'ıyor';
                    break;
                case 'e':
                case 'i':
                    convertedWord = kataDasarTanpaAkhiran + 'iyor';
                    break;
                case 'o':
                case 'u':
                    convertedWord = kataDasarTanpaAkhiran + 'uyor';
                    break;
                case 'ö':
                case 'ü':
                    convertedWord = kataDasarTanpaAkhiran + 'üyor';
                    break;
            }
        } 
        // Jika akhirannya huruf vokal selain a dan e
        else {
            convertedWord = kataDasar + 'yor';
        }
    }
    return convertedWord;
};

export default convertSimdikiZaman