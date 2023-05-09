export function locationCategory(category: string) {
    const dict: { [index: string]: string } = {
        "Specialty care clinic": "1256",
        "Birthing center": "1325555",
        "Primary care clinic": "1256",
        "Surgical center": "1370",
        "Clinic": "1256",
        "Imaging center": "1315",
        "Cancer center": "1354",
        "Hospital": "1276",
        "Pharmacy": "1334",
        "Emergency department": "1505890",
        "Behavioral health clinic": "1323"
    };

    const list = category.split(",");
    const list2: string[] = [];
  
    for (let i = 0; i < list.length; i++) {
      const category = list[i].trim();
  
      if (category in dict) {
        const value = dict[category];
        list2.push(value);
      }
    }
  
    const text = list2.toString();
  
    return text;
  
}