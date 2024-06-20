
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
                return `benim ${input}ım`                
            case 'e':
            case 'i':
                return `benim ${input}im`                
            case 'o':
            case 'u':
                return `benim ${input}um`                
            case 'ö':
            case 'ü':
                return `benim ${input}üm`                
        }
    } else if ("aeıioöuü".includes(lastChar.toLowerCase())) {
        return `benim ${input}m`                
    }
}

export const sen = (input) => {
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
                return `senin ${input}ın`                
            case 'e':
            case 'i':
                return `senin ${input}in`                
            case 'o':
            case 'u':
                return `senin ${input}un`                
            case 'ö':
            case 'ü':
                return `senin ${input}ün`                
        }
    } else if ("aeıioöuü".includes(lastChar.toLowerCase())) {
        return `senin ${input}n`                
    }
}

export const o = (input) => {
    if (input.includes("mak") || input.includes("mek")) {
        return "Input tidak valid. Masukkan kata benda";
    }
    const lastChar = input.charAt(input.length - 1)
    if ("bcçdfgğhjklmnprsştvyz".includes(lastChar.toLowerCase())) {
        // Mendapatkan huruf vokal terakhir
        const lastVowel = input.match(/[aeıioöuü]/gi).pop();

        // Menambahkan sufiks sesuai aturan
        switch (lastVowel.toLowerCase()) {
            case 'a':
            case 'ı':
                return `onun ${input}ı`                
            case 'e':
            case 'i':
                return `onun ${input}i`                
            case 'o':
            case 'u':
                return `onun ${input}u`                
            case 'ö':
            case 'ü':
                return `onun ${input}ü`                
        }
    } else if ("aeıioöuü".includes(lastChar.toLowerCase())) {
        switch (lastChar) {
            case 'a':
            case 'ı':
                return `onun ${input}sı`                
            case 'e':
            case 'i':
                return `onun ${input}si`                
            case 'o':
            case 'u':
                return `onun ${input}su`                
            case 'ö':
            case 'ü':
                return `onun ${input}sü`                
        }                
    }
}

export const biz = (input) => {
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
                return `bizim ${input}ımız`                
            case 'e':
            case 'i':
                return `bizim ${input}imiz`                
            case 'o':
            case 'u':
                return `bizim ${input}umuz`                
            case 'ö':
            case 'ü':
                return `bizim ${input}ümüz`                
        }
    } else if ("aeıioöuü".includes(lastChar.toLowerCase())) {
        return `bizim ${input}mız`                
    }
}

export const siz = (input) => {
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
                return `sizin ${input}ınız`                
            case 'e':
            case 'i':
                return `sizin ${input}iniz`                
            case 'o':
            case 'u':
                return `sizin ${input}unuz`                
            case 'ö':
            case 'ü':
                return `sizin ${input}ünüz`                
        }
    } else if ("aeıioöuü".includes(lastChar.toLowerCase())) {
        return `sizin ${input}nız`                
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
                return  `onların ${input}ları`
            case 'ö':
            case 'ü':                
            case 'e':
            case 'i':
                return  `onların ${input}leri`
        }
}
