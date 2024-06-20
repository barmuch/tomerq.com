const convertSimdikiZamanNegatif = (input) => {
    // Validasi input user harus ada kata "mak" atau "mek"
    if (!input.includes("mak") && !input.includes("mek")) {
        return "Input tidak valid. Harus mengandung kata 'mak' atau 'mek'.";
    }

   
    // Menghapus 3 huruf terakhir dari input
    const kataDasar = input.slice(0, -3);

    let convertedWord = "";

        // Mendapatkan huruf vokal terakhir
        const lastVowel = kataDasar.match(/[aeıioöuü]/gi).pop();

        // Menambahkan sufiks sesuai aturan
        switch (lastVowel.toLowerCase()) {
            case 'a':
            case 'ı':
                convertedWord = kataDasar + 'mıyor';
                break;
            case 'e':
            case 'i':
                convertedWord = kataDasar + 'miyor';
                break;
            case 'o':
            case 'u':
                convertedWord = kataDasar + 'muyor';
                break;
            case 'ö':
            case 'ü':
                convertedWord = kataDasar + 'üyor';
                break;
        }
     
    return convertedWord;
};

export default convertSimdikiZamanNegatif