export function DateConverter(date) {
    const newDate = new Date(date).toLocaleDateString();
    return newDate;
}