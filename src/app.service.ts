import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    isMutant(dna: string[]): boolean {
        const n = dna.length;
        const matrix = this.createMatrix(dna);

        // Función para verificar si una secuencia es mutante
        const checkSequence = (sequence: string): boolean => {
            const regex = /(A{4}|C{4}|G{4}|T{4})/;
            return regex.test(sequence);
        };

        // Verificar secuencias horizontales y verticales
        for (let i = 0; i < n; i++) {
            let horizontal = '';
            let vertical = '';
            for (let j = 0; j < n; j++) {
                horizontal += matrix[i][j];
                vertical += matrix[j][i];
            }
            if (checkSequence(horizontal) || checkSequence(vertical)) {
                return true;
            }
        }

        // Verificar secuencias diagonales
        for (let i = 0; i < n - 3; i++) {
            for (let j = 0; j < n - 3; j++) {
                const diagonal1 =
                    matrix[i][j] +
                    matrix[i + 1][j + 1] +
                    matrix[i + 2][j + 2] +
                    matrix[i + 3][j + 3];
                const diagonal2 =
                    matrix[i][j + 3] +
                    matrix[i + 1][j + 2] +
                    matrix[i + 2][j + 1] +
                    matrix[i + 3][j];
                if (checkSequence(diagonal1) || checkSequence(diagonal2)) {
                    return true;
                }
            }
        }

        // No se encontraron suficientes secuencias mutantes
        return false;
    }

    private createMatrix(dna: string[]): string[][] {
        return dna.map((row) => row.split(''));
    }
}
