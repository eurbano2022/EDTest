import { Injectable } from '@nestjs/common';

export type responseMutant = {
    is_mutant: boolean;
    num_sequences_found: number;
    secuences_found: string[];
};
@Injectable()
export class AppService {
    sequences = [];

    getHello(): string {
        return 'Hello World!';
    }

    async isMutant(dna: string[]): Promise<responseMutant> {
        this.sequences = [];
        const matrix = this.createMatrix(dna);
        const transpose = await this.transposeMatrix(matrix);
        let leftDiagonals = await this.getReverseDiagonals(matrix);
        let rightDiagonals = await this.getDiagonals(matrix);

        [leftDiagonals, rightDiagonals] = await Promise.all([
            this.deleteRepeatRows(leftDiagonals),
            this.deleteRepeatRows(rightDiagonals),
        ]);

        const [
            transposeRepetitions,
            matrixCountRepetitions,
            leftDiagonalsRepetitions,
            rightDiagonalsRepetitions,
        ] = await Promise.all([
            this.countRowsWithFourRepetitions(transpose),
            this.countRowsWithFourRepetitions(matrix),
            this.countRowsWithFourRepetitions(leftDiagonals),
            this.countRowsWithFourRepetitions(rightDiagonals),
        ]);

        const result =
            transposeRepetitions +
            matrixCountRepetitions +
            leftDiagonalsRepetitions +
            rightDiagonalsRepetitions;

        return {
            is_mutant: result >= 2,
            num_sequences_found: result,
            secuences_found: this.sequences,
        };
    }

    private async transposeMatrix(matrix: string[][]): Promise<string[][]> {
        return Promise.all(
            matrix[0].map((_, columnIndex) =>
                matrix.reduce((column, row) => {
                    column.push(row[columnIndex]);
                    return column;
                }, []),
            ),
        );
    }
    private createMatrix(dna: string[]): string[][] {
        return dna.map((row) => row.split(''));
    }

    private async countRowsWithFourRepetitions(
        matrix: string[][],
    ): Promise<number> {
        let count = 0;

        await Promise.all(
            matrix.map(async (row) => {
                if (row.join('').match(/(.)\1{3}/) !== null) {
                    this.sequences.push(row.join('').match(/(.)\1{3}/).input);
                    count++;
                }
            }),
        );

        return count;
    }

    private async getDiagonals(matrix: string[][]): Promise<string[][]> {
        const numRows = matrix.length;
        const numCols = matrix[0].length;

        const diagonals: string[][] = [];

        await Promise.all(
            [...Array(numCols).keys(), ...Array(numRows - 3).keys()].map(
                async (k) => {
                    const diagonal: string[] = [];

                    diagonal.push(
                        ...(await Promise.all(
                            Array(Math.min(numRows - k, numCols))
                                .fill('')
                                .map(async (_, i) => matrix[i + k][i]),
                        )),
                    );

                    if (diagonal.length >= 4) {
                        diagonals.push(diagonal);
                    }
                },
            ),
        );

        return diagonals;
    }
    private async getReverseDiagonals(matrix: string[][]): Promise<string[][]> {
        const numRows = matrix.length;
        const numCols = matrix[0].length;

        const reverseDiagonals: string[][] = [];

        await Promise.all(
            [...Array(numCols).keys(), ...Array(numRows - 3).keys()].map(
                async (k) => {
                    const reverseDiagonal: string[] = [];

                    reverseDiagonal.push(
                        ...(await Promise.all(
                            Array(Math.min(numRows - k, numCols))
                                .fill('')
                                .map(
                                    async (_, i) =>
                                        matrix[numRows - 1 - i - k][i],
                                ),
                        )),
                    );

                    if (reverseDiagonal.length >= 4) {
                        reverseDiagonals.push(reverseDiagonal);
                    }
                },
            ),
        );

        return reverseDiagonals;
    }
    private async deleteRepeatRows(matrix): Promise<string[][]> {
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
