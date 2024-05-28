import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchema1716852060382 implements MigrationInterface {
  name = 'CreateSchema1716852060382';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "created" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "article" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "created" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "userId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "like" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer NOT NULL, "articleId" integer NOT NULL, CONSTRAINT "UQ_73848fcc5fb55cef88049ec4803" UNIQUE ("userId", "articleId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_article" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "created" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "userId" integer NOT NULL, CONSTRAINT "FK_636f17dadfea1ffb4a412296a28" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_article"("id", "title", "content", "created", "userId") SELECT "id", "title", "content", "created", "userId" FROM "article"`,
    );
    await queryRunner.query(`DROP TABLE "article"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_article" RENAME TO "article"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_like" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer NOT NULL, "articleId" integer NOT NULL, CONSTRAINT "UQ_73848fcc5fb55cef88049ec4803" UNIQUE ("userId", "articleId"), CONSTRAINT "FK_a95ce350aee91167d8a1cefeb97" FOREIGN KEY ("articleId") REFERENCES "article" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_like"("id", "userId", "articleId") SELECT "id", "userId", "articleId" FROM "like"`,
    );
    await queryRunner.query(`DROP TABLE "like"`);
    await queryRunner.query(`ALTER TABLE "temporary_like" RENAME TO "like"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "like" RENAME TO "temporary_like"`);
    await queryRunner.query(
      `CREATE TABLE "like" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer NOT NULL, "articleId" integer NOT NULL, CONSTRAINT "UQ_73848fcc5fb55cef88049ec4803" UNIQUE ("userId", "articleId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "like"("id", "userId", "articleId") SELECT "id", "userId", "articleId" FROM "temporary_like"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_like"`);
    await queryRunner.query(
      `ALTER TABLE "article" RENAME TO "temporary_article"`,
    );
    await queryRunner.query(
      `CREATE TABLE "article" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "created" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "userId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "article"("id", "title", "content", "created", "userId") SELECT "id", "title", "content", "created", "userId" FROM "temporary_article"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_article"`);
    await queryRunner.query(`DROP TABLE "like"`);
    await queryRunner.query(`DROP TABLE "article"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
