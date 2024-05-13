export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export const truncate = (str, size) => {
    return str.length > size ? str.slice(0, size - 1) + "…" : str;
}