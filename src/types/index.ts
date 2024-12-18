import { Timestamp } from "firebase/firestore";

export interface BaseUser {
    id?: number
    nome: string
    nome_usuario: string
    foto_usuario?: string
    descricao?: string
    email: string
    senha?: string
    cpf: string
    data_nascimento: string
    telefone: string
    disponibilidade?: boolean
    avaliacao?: number | null
}

export interface DetailedUser extends BaseUser {
    seguidores?: number,
    seguindo?: number,
    qnt_publicacoes?: number,
    publicacoes?: (Product | Publication)[] | (DetailedProduct | DetailedPublication)[],
    pastas?: Folder[]
    esta_seguindo?: boolean
}

export type ProfileUser = BaseUser & DetailedUser

export interface Address {
    id_endereco?: number
    logradouro: string
    numero_casa: number
    complemento?: string
    bairro: string
    estado: string
    cidade: string
    cep: string
    localidade?: string
    id_usuario?: number
}

export interface Category {
    id: number
    nome: string
}

export interface Image {
    id_imagem: number,
    url: string
}

export interface Product {
    tipo: 'produto',
    id_publicacao: number,
    nome: string,
    descricao: string,
    item_digital: boolean,
    marca_dagua: boolean,
    preco: number,
    quantidade: number,
    curtida: boolean,
    favorito: boolean,
    preferencia: boolean,
    imagens: Image[]
}

export interface DetailedProduct extends Product {
    id_dono_publicacao: number,
    dono_publicacao: DetailedUser,
    quantidade_visualizacoes?: number | null,
    comentarios?: Comment[]
    categorias?: Category[]
}

export interface Publication {
    tipo: 'postagem',
    id_publicacao: number,
    nome: string,
    descricao: string,
    item_digital: null,
    marca_dagua: null,
    preco: null,
    quantidade: null,
    curtida: boolean,
    favorito: boolean,
    preferencia: boolean,
    imagens: Image[]
}

export interface DetailedPublication extends Publication {
    id_dono_publicacao: number,
    dono_publicacao: DetailedUser,
    quantidade_visualizacoes?: number | null,
    comentarios?: Comment[]
    categorias?: Category[]
}

export interface Folder {
    id_pasta: number
    nome: string
    id_usuario?: number
    itens?: (DetailedProduct | DetailedPublication)[]
}

export interface Comment {
    id_comentario: number
    mensagem: string
    id_usuario: number
    id_resposta: number | null
    nome_usuario: string
    foto_usuario: string
}

export interface Chat {
    id: string
    user1: ChatProfile
    user2: ChatProfile
    lastMessage?: Message
    messages?: Message[]
}

export interface ChatProfile {
    id: number
    avatar: string
    nickname: string
}

export interface LastMessage {
    text: string
    timestamp: Timestamp | null
}

export interface Message extends LastMessage{
    id: number
    userId: number
}