import fs from "fs";

export class FilePersistenceAdapter {
    saveToFile(circuit, filename) {
        const data = circuit.describe();
        fs.writeFileSync(filename, data, "utf-8");
    }
}
