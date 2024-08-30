export default function convertDateToISO(dateString) {
    // Создаем объект Date на основе строки с датой
    const date = new Date(dateString);
    
    // Преобразуем дату в формат ISO
    const isoDateString = date.toISOString();
    
    return isoDateString;
}