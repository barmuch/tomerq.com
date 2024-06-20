
export const ben = (input) => {
    const lastChar = input.charAt(input.length - 1);

    if (input.includes("mak") || input.includes("mek")) {
        return "Input tidak valid. Masukkan kata benda";
    }
    if ("bcçdfgğhjklmnprsştvyz".includes(lastChar.toLowerCase())) {
        // Mendapatkan huruf vokal terakhir
        const lastVowel = input.match(/[aeıioöuü]/gi).pop();

        // Menambahkan sufiks sesuai aturan
        switch (lastVowel.toLowerCase()) {
            case 'a':
            case 'ı':
                return input + 'ım';                
            case 'e':
            case 'i':
                return input + 'im';
            case 'o':
            case 'u':
                return input + 'um';
            case 'ö':
            case 'ü':
                return input + 'üm';
        }
    } else if ("aeıioöuü".includes(lastChar.toLowerCase())) {
            switch (lastChar.toLowerCase()) {
                case 'a':
                case 'ı':
                    return input + 'yım';                
                case 'e':
                case 'i':
                    return input + 'yim';
                case 'o':
                case 'u':
                    return input + 'yum';
                case 'ö':
                case 'ü':
                    return input + 'yüm';
            } 
        
    }
}

export const sen = (input) => {
    if (input.includes("mak") || input.includes("mek")) {
        return "Input tidak valid. Masukkan kata benda";
    }
    const lastVowel = input.match(/[aeıioöuü]/gi).pop();
        switch (lastVowel.toLowerCase()) {
            case 'a':
            case 'ı':
                return input + 'sın';                
            case 'e':
            case 'i':
                return input + 'sin';
            case 'o':
            case 'u':
                return input + 'sun';
            case 'ö':
            case 'ü':
                return input + 'sün';
        }
}

export const o = (input) => {
    if (input.includes("mak") || input.includes("mek")) {
        return "Input tidak valid. Masukkan kata benda";
    }
    return input
}

export const biz = (input) => {
    if (input.includes("mak") || input.includes("mek")) {
        return "Input tidak valid. Masukkan kata benda";
    }
    const lastChar = input.charAt(input.length - 1);

    if (input.includes("mak") || input.includes("mek")) {
        return "Input tidak valid. Masukkan kata benda";
    }
    if ("bcçdfgğhjklmnprsştvyz".includes(lastChar.toLowerCase())) {
        // Mendapatkan huruf vokal terakhir
        const lastVowel = input.match(/[aeıioöuü]/gi).pop();

        // Menambahkan sufiks sesuai aturan
        switch (lastVowel.toLowerCase()) {
            case 'a':
            case 'ı':
                return input + 'ız';                
            case 'e':
            case 'i':
                return input + 'iz';
            case 'o':
            case 'u':
                return input + 'uz';
            case 'ö':
            case 'ü':
                return input + 'üz';
        }
    } else if ("aeıioöuü".includes(lastChar.toLowerCase())) {
            switch (lastChar.toLowerCase()) {
                case 'a':
                case 'ı':
                    return input + 'yız';                
                case 'e':
                case 'i':
                    return input + 'yiz';
                case 'o':
                case 'u':
                    return input + 'yuz';
                case 'ö':
                case 'ü':
                    return input + 'yüz';
            } 
        
    }
}

export const siz = (input) => {
    if (input.includes("mak") || input.includes("mek")) {
        return "Input tidak valid. Masukkan kata benda";
    }
    const lastVowel = input.match(/[aeıioöuü]/gi).pop();
        switch (lastVowel.toLowerCase()) {
            case 'a':
            case 'ı':
                return input + 'sınız';                
            case 'e':
            case 'i':
                return input + 'siniz';
            case 'o':
            case 'u':
                return input + 'sunuz';
            case 'ö':
            case 'ü':
                return input + 'sünüz';
        }
}

export const onlar = (input) => {
    if (input.includes("mak") || input.includes("mek")) {
        return "Input tidak valid. Masukkan kata benda";
    }
    const lastVowel = input.match(/[aeıioöuü]/gi).pop();
        switch (lastVowel.toLowerCase()) {
            case 'a':
            case 'ı':
            case 'o':
            case 'u':
                return input + 'lar';
            case 'ö':
            case 'ü':                
            case 'e':
            case 'i':
                return input + 'ler';             
        }
}
