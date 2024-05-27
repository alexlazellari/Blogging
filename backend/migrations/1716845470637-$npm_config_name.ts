import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1716845470637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS like`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE like (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        articleId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES user(id),
        FOREIGN KEY (articleId) REFERENCES article(id)
      )
    `);
  }
}
