
export const benSoru = (input) => {

    if (input.includes("mak") || input.includes("mek")) {
        return "Input tidak valid. Masukkan kata benda";
    }
        const lastVowel = input.match(/[aeıioöuü]/gi).pop();

        // Menambahkan sufiks sesuai aturan
        switch (lastVowel.toLowerCase()) {
            case 'a':
            case 'ı':
                return input + ' mıyım ?';                
            case 'e':
            case 'i':
                return input + ' miyim ?';
            case 'o':
            case 'u':
                return input + ' muyum ?';
            case 'ö':
            case 'ü':
                return input + ' müyüm ?';
        }
}

export const senSoru = (input) => {
    if (input.includes("mak") || input.includes("mek")) {
        return "Input tidak valid. Masukkan kata benda";
    }
    const lastVowel = input.match(/[aeıioöuü]/gi).pop();
        switch (lastVowel.toLowerCase()) {
            case 'a':
            case 'ı':
                return input + ' mısın ?';                
            case 'e':
            case 'i':
                return input + ' misin ?';
            case 'o':
            case 'u':
                return input + ' musun ?';
            case 'ö':
            case 'ü':
                return input + ' müsün ?';
        }
}

export const oSoru = (input) => {
    if (input.includes("mak") || input.includes("mek")) {
        return "Input tidak valid. Masukkan kata benda";
    }
    const lastVowel = input.match(/[aeıioöuü]/gi).pop();
        switch (lastVowel.toLowerCase()) {
            case 'a':
            case 'ı':
                return input + ' mı ?';                
            case 'e':
            case 'i':
                return input + ' mi ?';
            case 'o':
            case 'u':
                return input + ' mu ?';
            case 'ö':
            case 'ü':
                return input + ' mü ?';
        }
}

export const bizSoru = (input) => {
    if (input.includes("mak") || input.includes("mek")) {
        return "Input tidak valid. Masukkan kata benda";
    }
    const lastVowel = input.match(/[aeıioöuü]/gi).pop();

        // Menambahkan sufiks sesuai aturan
        switch (lastVowel.toLowerCase()) {
            case 'a':
            case 'ı':
                return input + ' mıyız ?';                
            case 'e':
            case 'i':
                return input + ' miyiz ?';
            case 'o':
            case 'u':
                return input + ' muyuz ?';
            case 'ö':
            case 'ü':
                return input + ' müyüz ?';
        }
}

export const sizSoru = (input) => {
    if (input.includes("mak") || input.includes("mek")) {
        return "Input tidak valid. Masukkan kata benda";
    }
    const lastVowel = input.match(/[aeıioöuü]/gi).pop();
        switch (lastVowel.toLowerCase()) {
            case 'a':
            case 'ı':
                return input + ' mısınız ?';                
            case 'e':
            case 'i':
                return input + ' misiniz ?';
            case 'o':
            case 'u':
                return input + ' musunuz ?';
            case 'ö':
            case 'ü':
                return input + ' müsünüz ?';
        }
}

export const onlarSoru = (input) => {
    if (input.includes("mak") || input.includes("mek")) {
        return "Input tidak valid. Masukkan kata benda";
    }
    const lastVowel = input.match(/[aeıioöuü]/gi).pop();
        switch (lastVowel.toLowerCase()) {
            case 'a':
            case 'ı':
            case 'o':
            case 'u':
                return input + 'lar mı ?';
            case 'ö':
            case 'ü':                
            case 'e':
            case 'i':
                return input + 'ler mi ?';             
        }
}
