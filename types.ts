
export enum MetabolicType {
    AROMATIC_OX = "Aromatic Oxidation",
    ALKENE_OX = "Alkene Oxidation",
    ALKYL_OX = "Alkyl Oxidation (α, ω, ω-1)",
    ALCOHOL_OX = "Alcohol Oxidation",
    SULFUR_OX = "Sulfur Oxidation",
    SP2_N_OX = "sp² N-Oxidation",
    OXIDATIVE_DEALK = "Oxidative Dealkylation (N/O/S)"
}

export interface MetabolicInfo {
    id: string;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    reactionType: MetabolicType;
    pdfReference: string;
    products: string;
    productsAr: string;
    mechanismNote?: string;
    mechanismNoteAr?: string;
}
