import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserRole } from '../users/entities/user.entity';

/**
 * add default users
 * for testing
 */
export class CreateUsers1712215734000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO user (email, password, role) VALUES
      ('admin@example.com', 'teamwork', '${UserRole.ADMIN}'),
      ('user@example.com', 'teamwork', '${UserRole.USER}')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM user WHERE email IN ('admin@example.com', 'user@example.com')
    `);
  }
}
