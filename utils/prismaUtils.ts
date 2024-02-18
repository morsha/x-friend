import {PrismaClient} from '@prisma/client';
require('dotenv').config();

const prisma = new PrismaClient();

// User CRUD

// createUser
export async function createUser(data: {
    email: string;
    password: string;
    name?: string;
    userType: 'PROVIDER' | 'CONSUMER';
    evmAddress?: string;
}) {
    return prisma.user.create({
        data,
    });
}

// get user by Id
export async function getUserById(id: string) {
    return prisma.user.findUnique({
        where: {id},
    });
}

// update user
export async function updateUser(id: string, data: Partial<{
    email: string;
    password: string;
    name?: string;
    userType?: 'PROVIDER' | 'CONSUMER';
    evmAddress?: string;
}>) {
    return prisma.user.update({
        where: {id},
        data,
    });
}

// delete user
export async function deleteUser(id: string) {
    return prisma.user.delete({
        where: {id},
    });
}

// ------------------------------

// Service CRUD

// create service
export async function createService(data: {
    title: string;
    description: string;
    price: number;
    providerId: string;
    status: 'AVAILABLE' | 'PENDING' | 'COMPLETED';
}) {
    return prisma.service.create({
        data,
    });
}

// get service by Id
export async function getServiceById(id: string) {
    return prisma.service.findUnique({
        where: {id},
    });
}

// get all services
export async function getAllServices() {
    return prisma.service.findMany();
}

// update service
export async function updateService(id: string, data: Partial<{
    title: string;
    description: string;
    price: number;
    status: 'AVAILABLE' | 'PENDING' | 'COMPLETED';
}>) {
    return prisma.service.update({
        where: {id},
        data,
    });
}

// delete service
export async function deleteService(id: string) {
    return prisma.service.delete({
        where: {id},
    });
}

// ------------------------------

// Transaction CRUD

// create transaction
export async function createTransaction(data: {
    serviceId: string;
    buyerId: string;
    amount: number;
    status: 'PENDING' | 'COMPLETED';
    nftToken?: string;
}) {
    return prisma.transaction.create({
        data,
    });
}

// get transaction by Id
export async function getTransactionById(id: string) {
    return prisma.transaction.findUnique({
        where: {id},
    });
}

// get all transactions
export async function getAllTransactions() {
    return prisma.transaction.findMany();
}

// update transaction
export async function updateTransaction(id: string, data: Partial<{
    amount: number;
    status: 'PENDING' | 'COMPLETED';
    nftToken?: string;
}>) {
    return prisma.transaction.update({
        where: {id},
        data,
    });
}

// delete transaction
export async function deleteTransaction(id: string) {
    return prisma.transaction.delete({
        where: {id},
    });
}

// ------------------------------

// NFT CRUD

// create NFT
export async function createNFT(data: {
    tokenId: string;
    metadataUrl: string;
    ownerId: string;
    minterId: string;
    serviceId?: string;
}) {
    return prisma.nFT.create({
        data,
    });
}

// get NFT by Id
export async function getNFTById(id: string) {
    return prisma.nFT.findUnique({
        where: {id},
    });
}

// get all NFTs
export async function getAllNFTs() {
    return prisma.nFT.findMany();
}

// update NFT
export async function updateNFT(id: string, data: Partial<{
    metadataUrl: string;
    ownerId: string;
    serviceId?: string;
}>) {
    return prisma.nFT.update({
        where: {id},
        data,
    });
}

// delete NFT
export async function deleteNFT(id: string) {
    return prisma.nFT.delete({
        where: {id},
    });
}