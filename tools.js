import axios from "axios";

export function calculator(input) {
    try {
        return eval(input).toString();
    } catch {
        return "Invalid math expression";
    }
}

export async function getWeather(city) {
    const res = await axios.get(`https://wttr.in/${city}?format=j1`);
    return `Weather in ${city}: ${res.data.current_condition[0].temp_C}°C`;
}
