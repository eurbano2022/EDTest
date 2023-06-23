import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    isMutant(dna: string[]): boolean {
        const matrix = this.createMatrix(dna);
        const transpose = this.transposeMatrix(matrix);
        let leftDiagonals = this.getReverseDiagonals(matrix);
        let rightDiagonals = this.getDiagonals(matrix);

        leftDiagonals = this.deleteRepeatRows(leftDiagonals);
        rightDiagonals = this.deleteRepeatRows(rightDiagonals);

        const transposeRepetitions =
            this.countRowsWithFourRepetitions(transpose);
        const matrixCountRepetitions =
            this.countRowsWithFourRepetitions(matrix);
        const leftDiagonalsRepetitions =
            this.countRowsWithFourRepetitions(leftDiagonals);
        const rightDiagonalsRepetitions =
            this.countRowsWithFourRepetitions(rightDiagonals);
        const result =
            transposeRepetitions +
            matrixCountRepetitions +
            leftDiagonalsRepetitions +
            rightDiagonalsRepetitions;

        return result >= 2;
    }

    private printMatrix(matrix: string[][]): void {
        for (const row of matrix) {
            console.log(row.join(' '));
        }
    }

    private transposeMatrix(matrix: string[][]): string[][] {
        return matrix[0].map((_, columnIndex) =>
            matrix.reduce((column, row) => {
                column.push(row[columnIndex]);
                return column;
            }, []),
        );
    }
    private createMatrix(dna: string[]): string[][] {
        return dna.map((row) => row.split(''));
    }

    private countRowsWithFourRepetitions(matrix: string[][]): number {
        let count = 0;
        matrix.forEach((row) => {
            if (row.join('').match(/(.)\1{3}/) !== null) {
                count++;
            }
        });
        return count;
    }

    private getDiagonals(matrix: string[][]): string[][] {
        const numRows = matrix.length;
        const numCols = matrix[0].length;

        const diagonals = [
            ...Array(numCols).keys(),
            ...Array(numRows - 3).keys(),
        ].flatMap((k) => {
            const diagonal: string[] = [];

            diagonal.push(
                ...Array(Math.min(numRows - k, numCols))
                    .fill('')
                    .map((_, i) => matrix[i + k][i]),
            );

            return diagonal.length >= 4 ? [diagonal] : [];
        });

        return diagonals;
    }
    private getReverseDiagonals(matrix: string[][]): string[][] {
        const numRows = matrix.length;
        const numCols = matrix[0].length;

        const reverseDiagonals = [
            ...Array(numCols).keys(),
            ...Array(numRows - 3).keys(),
        ].flatMap((k) => {
            const reverseDiagonal: string[] = [];

            reverseDiagonal.push(
                ...Array(Math.min(numRows - k, numCols))
                    .fill('')
                    .map((_, i) => matrix[numRows - 1 - i - k][i]),
            );

            return reverseDiagonal.length >= 4 ? [reverseDiagonal] : [];
        });

        return reverseDiagonals;
    }
    private deleteRepeatRows(matrix) {
        const unicRows = matrix.filter((row, index) => {
            return (
                matrix.findIndex((row2) => {
                    return JSON.stringify(row) === JSON.stringify(row2);
                }) === index
            );
        });

        return unicRows;
    }
}
