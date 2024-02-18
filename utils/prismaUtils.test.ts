import {PrismaClient} from '@prisma/client';
import {
    createUser,
    getUserById,
    createService,
    getServiceById,
    updateService,
    deleteService,
    deleteUser, updateUser, getNFTById, createNFT, getTransactionById, createTransaction
} from './prismaUtils';

const prisma = new PrismaClient();

// Mock Prisma Client
// jest.mock('@prisma/client', () => {
//     return {
//         PrismaClient: jest.fn().mockImplementation(() => ({
//             user: {
//                 create: jest.fn().mockResolvedValue({ id: '1', email: 'test@test.com' }),
//                 findUnique: jest.fn().mockResolvedValue({ id: '1', email: 'test@test.com' }),
//                 update: jest.fn().mockResolvedValue({ id: '1', name: 'Updated Name' }),
//                 delete: jest.fn().mockResolvedValue({ id: '1' }),
//             },
//             service: {
//                 create: jest.fn().mockResolvedValue({ id: '1', title: 'Test Service' }),
//                 findUnique: jest.fn().mockResolvedValue({ id: '1', title: 'Test Service' }),
//                 findMany: jest.fn().mockResolvedValue([{ id: '1', title: 'Test Service' }]),
//                 update: jest.fn().mockResolvedValue({ id: '1', title: 'Updated Service' }),
//                 delete: jest.fn().mockResolvedValue({ id: '1' }),
//             },
//             transaction: {
//                 create: jest.fn().mockResolvedValue({ id: '1', amount: 200, status: 'PENDING'}),
//                 findUnique: jest.fn().mockResolvedValue({ id: '1', amount: 200, status: 'PENDING' }),
//                 findMany: jest.fn().mockResolvedValue([{ id: '1', amount: 200, status: 'PENDING' }]),
//                 update: jest.fn().mockResolvedValue({ id: '1', amount: 200 }),
//                 delete: jest.fn().mockResolvedValue({ id: '1' }),
//             },
//             nFT: {
//                 create: jest.fn().mockResolvedValue({ id: '1', tokenId: 'NFT123', metadataUrl: 'https://example.com/nft/123' }),
//                 findUnique: jest.fn().mockResolvedValue({ id: '1', tokenId: 'NFT123' }),
//                 findMany: jest.fn().mockResolvedValue([{ id: '1', tokenId: 'NFT123' }]),
//                 update: jest.fn().mockResolvedValue({ id: '1', tokenId: 'NFT456' }),
//                 delete: jest.fn().mockResolvedValue({ id: '1' }),
//             },
//         })),
//     };
// });


describe('prismaUtils', () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('creates a user', async () => {
        const user = await createUser({
            email: 'test@test.com',
            password: 'password',
            userType: 'CONSUMER',
        });
        expect(user).toHaveProperty('id');
        expect(user.email).toBe('test@test.com');
    });

    it('gets a user by ID', async () => {
        const user = await getUserById('1');
        expect(user).toHaveProperty('email', 'test@test.com');
    });

    it('creates a service', async () => {
        const service = await createService({
            title: 'Test Service',
            description: 'A test service',
            price: 100,
            providerId: '1',
            status: 'AVAILABLE',
        });
        expect(service).toHaveProperty('id');
        expect(service.title).toBe('Test Service');
    });

    it('gets a service by ID', async () => {
        const service = await getServiceById('1');
        expect(service).toHaveProperty('title', 'Test Service');
    });

    it('updates a user', async () => {
        const updatedUser = await updateUser('1', {name: 'Updated Name'});
        expect(updatedUser).toHaveProperty('name', 'Updated Name');
    });

    // it('deletes a user', async () => {
    //     const deletedUser = await deleteUser('1');
    //     expect(deletedUser).toHaveProperty('id', '1');
    // });


    it('updates a service', async () => {
        const updatedService = await updateService('1', {title: 'Updated Service'});
        expect(updatedService).toHaveProperty('title', 'Updated Service');
    });


    // it('deletes a service', async () => {
    //     const deletedService = await deleteService('1');
    //     expect(deletedService).toHaveProperty('id', '1');
    // });

    it('creates a transaction', async () => {
        const transaction = await createTransaction({
            serviceId: '1',
            buyerId: '2',
            amount: 200,
            status: 'PENDING',
        });
        expect(transaction).toHaveProperty('id');
        expect(transaction.status).toBe('PENDING');
    });

    it('gets a transaction by ID', async () => {
        const transaction = await getTransactionById('1');
        expect(transaction).toHaveProperty('amount', 200);
    });

    it('creates an NFT', async () => {
        const nft = await createNFT({
            tokenId: '123',
            metadataUrl: 'https://example.com/nft/123',
            ownerId: '1',
            minterId: '2',
        });
        expect(nft).toHaveProperty('tokenId', 'NFT123');
        expect(nft.metadataUrl).toBe('https://example.com/nft/123');
    });

    it('gets an NFT by ID', async () => {
        const nft = await getNFTById('1');
        expect(nft).toHaveProperty('tokenId', 'NFT123');
    });

});
