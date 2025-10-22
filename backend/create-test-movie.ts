import { prisma } from './src/config/database';
import 'dotenv/config';

async function createTestMovie() {
  try {
    // Buscar o primeiro usuário
    const user = await prisma.user.findFirst();
    
    if (!user) {
      console.error('❌ Nenhum usuário encontrado no banco de dados.');
      console.log('💡 Execute: npm run seed');
      return;
    }
    
    // Data de hoje às 00:00:00
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Criar filme de teste
    const movie = await prisma.movie.create({
      data: {
        title: 'Filme Teste - Lembrete de E-mail',
        originalTitle: 'Test Movie - Email Reminder',
        releaseDate: today,
        description: 'Este é um filme de teste criado para validar o envio de e-mails de lembrete.',
        duration: 120,
        genre: 'Teste',
        rating: 8.5,
        reminderSent: false,
        userId: user.id,
      },
    });
    
    console.log('✅ Filme de teste criado com sucesso!');
    console.log('📋 Detalhes:');
    console.log(`   ID: ${movie.id}`);
    console.log(`   Título: ${movie.title}`);
    console.log(`   Data: ${movie.releaseDate.toLocaleDateString('pt-BR')}`);
    console.log(`   Usuário: ${user.email}`);
    console.log('\n💡 Agora execute: npx tsx src/test-email.ts');
  } catch (error) {
    console.error('❌ Erro ao criar filme:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestMovie();
