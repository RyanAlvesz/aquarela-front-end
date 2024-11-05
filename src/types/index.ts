export interface User {
    id?: number
    nome: string;
    nome_usuario: string;
    foto_usuario?: string;
    descricao?: string;
    email: string;
    senha?: string;
    cpf: string;
    data_nascimento: string;
    telefone: string;
    disponibilidade?: boolean;
    avaliacao?: number | null
    seguidores?: number,
    seguindo?: number,
    qnt_publicacoes?: number,
    publicacoes?: (Product | Publication)[],
    pastas?: Folder[]
    esta_seguindo?: boolean
}

export interface Address {
    id_endereco: number;
    logradouro: string;
    numero_casa: number;
    complemento?: string;
    bairro: string;
    estado: string;
    cidade: string;
    cep?: string;
    status: boolean;
};

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
    id_dono_publicacao?: number,
    curtida: boolean,
    preferencia: boolean,
    dono_publicacao?: User
    imagens: Image[]
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
    id_dono_publicacao?: number,
    curtida: boolean,
    preferencia: boolean,
    dono_publicacao?: User
    imagens: Image[]
}

export interface Folder {
    id: number
    nome: string
    id_usuario?: number
    itens?: (Product | Publication)[] 
}



