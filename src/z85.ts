// Algorithm description: https://rfc.zeromq.org/spec/32/
// Reference impl: https://github.com/zeromq/rfc/blob/master/src/spec_32.c
// SH's impl: https://github.com/sbcomputertech/tiercodes/blob/main/TiersOfHeckCodes/Z85.cs

const chars = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 
    'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 
    'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 
    'Y', 'Z', '.', '-', ':', '+', '=', '^', '!', '/', 
    '*', '?', '&', '<', '>', '(', ')', '[', ']', '{', 
    '}', '@', '%', '$', '#' 
]

const base256 = [ 
    0, 68, 0, 84, 83, 82, 72, 0, 75, 76, 70, 65, 0, 63, 
    62, 69, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 64, 0, 73, 66, 
    74, 71, 81, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 
    47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 
    61, 77, 0, 78, 67, 0, 0, 10, 11, 12, 13, 14, 15, 16, 17, 
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 
    33, 34, 35, 79, 0, 80, 0, 0
]

export const z85encode = (input: Uint8Array): string | null => {
    // TODO
    return null
}

export const z85decode = (input: string): Uint8Array | null => {
    var paddingCount = input.length % 5

    if(paddingCount != 0 && (input.length - 1) % 5 != 0) {
        console.error("Invalid Z85 string length")
        return null
    }

    var paddingNum = parseInt(input[input.length - 1]) || 0
    if(paddingCount != 0 && (!paddingNum || paddingNum < 1 || paddingNum > 3)) {
        console.error("Invalid Z85 padding number")
        return null
    }

    const decodeSize = Math.floor(input.length / 5) * 4
    var bytes = new Uint8Array(decodeSize)
    var byteNum = 0

    for(var i = 0; i < input.length - 1; i += 5) {
        var acc = base256[input.charCodeAt(i) - 0x20 & 0x7f]
        acc = acc * 85 + base256[input.charCodeAt(i + 1) - 0x20 & 0x7f]
        acc = acc * 85 + base256[input.charCodeAt(i + 2) - 0x20 & 0x7f]
        acc = acc * 85 + base256[input.charCodeAt(i + 3) - 0x20 & 0x7f]
        acc = acc * 85 + base256[input.charCodeAt(i + 4) - 0x20 & 0x7f]

        bytes[byteNum++] = acc >> 24
        acc = acc << 8 >> 8
        bytes[byteNum++] = acc >> 16
        acc = acc << 16 >> 16
        bytes[byteNum++] = acc >> 8
        acc = acc << 24 >> 24
        bytes[byteNum++] = acc
    }

    console.assert(byteNum == decodeSize, "Z85 decoded length does not match expected!")
    return bytes.slice(0, byteNum - paddingNum)
}