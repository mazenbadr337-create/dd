
import { MetabolicInfo, MetabolicType } from './types';

// Custom Designed Molecule:
// Pyridine ring (sp2 N) substituted with Dimethylamine (N-Dealk).
// Linked to Benzene ring substituted with:
// - Methoxy (O-Dealk)
// - Thiomethyl (S-Ox / S-Dealk)
// - Side chain with Alkene, Alcohol, and Alkyl chain (Alkyl Ox)

export const SCHEMA_SMILES = "CN(C)c1cccnc1-c2cc(OC)c(SC)cc2CC=CC(O)CCC"; 

export const METABOLIC_DATA: Record<string, MetabolicInfo> = {
    // 1. Aromatic Oxidation
    "aromatic_ox": {
        id: "aromatic_ox",
        title: "Aromatic Oxidation",
        titleAr: "الأكسدة العطرية (Aromatic Oxidation)",
        reactionType: MetabolicType.AROMATIC_OX,
        description: "Hydroxylation of the aromatic ring. Electron-donating groups (like -OCH3) direct the oxidation to ortho/para positions via an Arene Oxide intermediate.",
        descriptionAr: "هيدروكسيلة الحلقة العطرية. المجموعات المانحة للإلكترونات (مثل -OCH3) توجه الأكسدة نحو المواقع أورثو/بارا عبر وسيط أكسيد الأرين.",
        products: "Phenols (via Arene Oxide & NIH Shift).",
        productsAr: "فينولات (عبر إعادة ترتيب NIH).",
        pdfReference: "Page 2-5",
    },

    // 2. Alkene Oxidation
    "alkene_ox": {
        id: "alkene_ox",
        title: "Alkene Epoxidation",
        titleAr: "أكسدة الألكينات (Epoxidation)",
        reactionType: MetabolicType.ALKENE_OX,
        description: "Metabolic oxidation of a carbon-carbon double bond (C=C) yields an Epoxide. Epoxides are often unstable and hydrolyzed.",
        descriptionAr: "الأكسدة الأيضية للرابطة المزدوجة (C=C) تنتج الإيبوكسيد (Epoxide). الإيبوكسيدات غالباً ما تكون غير مستقرة وتتحلل مائياً.",
        products: "Epoxide -> trans-Dihydrodiol.",
        productsAr: "إيبوكسيد -> trans-Dihydrodiol.",
        pdfReference: "Page 6-7",
    },

    // 3. Alkyl Oxidation (Grouped: Alpha, Omega, Omega-1)
    "alkyl_ox_omega": {
        id: "alkyl_ox_omega",
        title: "Alkyl Oxidation (ω-Oxidation)",
        titleAr: "أكسدة الألكيل (أكسدة أوميغا)",
        reactionType: MetabolicType.ALKYL_OX,
        description: "Oxidation of the terminal methyl group (ω) of an aliphatic chain to a primary alcohol, then to a carboxylic acid.",
        descriptionAr: "أكسدة مجموعة الميثيل الطرفية (ω) في السلسلة الأليفاتية إلى كحول أولي، ثم إلى حمض كربوكسيلي.",
        products: "Primary Alcohol -> Carboxylic Acid.",
        productsAr: "كحول أولي -> حمض كربوكسيلي.",
        pdfReference: "Page 11",
    },
    "alkyl_ox_omega_1": {
        id: "alkyl_ox_omega_1",
        title: "Alkyl Oxidation (ω-1 Oxidation)",
        titleAr: "أكسدة الألكيل (أكسدة ما قبل الطرفية)",
        reactionType: MetabolicType.ALKYL_OX,
        description: "Oxidation of the penultimate carbon (ω-1). Favored in long alkyl chains.",
        descriptionAr: "أكسدة ذرة الكربون ما قبل الأخيرة (ω-1). مفضلة في سلاسل الألكيل الطويلة.",
        products: "Secondary Alcohol.",
        productsAr: "كحول ثانوي.",
        pdfReference: "Page 11",
    },
    "alkyl_ox_alpha": {
        id: "alkyl_ox_alpha",
        title: "Alkyl Oxidation (α-Oxidation)",
        titleAr: "أكسدة الألكيل (أكسدة ألفا)",
        reactionType: MetabolicType.ALKYL_OX,
        description: "Oxidation of carbons adjacent to unsaturated centers (Allylic or Benzylic positions).",
        descriptionAr: "أكسدة ذرات الكربون المجاورة للمراكز غير المشبعة (المواقع الأليلية أو البنزيلية).",
        products: "Alcohol.",
        productsAr: "كحول.",
        pdfReference: "Page 9-10",
    },

    // 4. Alcohol Oxidation
    "alcohol_ox": {
        id: "alcohol_ox",
        title: "Alcohol Oxidation",
        titleAr: "أكسدة الكحولات",
        reactionType: MetabolicType.ALCOHOL_OX,
        description: "Metabolic oxidation of alcohols. Primary alcohols form aldehydes (then acids); Secondary alcohols form ketones.",
        descriptionAr: "الأكسدة الأيضية للكحولات. الكحولات الأولية تتحول لألدهيدات (ثم أحماض)؛ الكحولات الثانوية تتحول لكيتونات.",
        products: "Aldehydes / Ketones.",
        productsAr: "ألدهيدات / كيتونات.",
        pdfReference: "Page 12-13",
    },

    // 5. Sulfur Oxidation
    "sulfur_ox": {
        id: "sulfur_ox",
        title: "Sulfur Oxidation",
        titleAr: "أكسدة الكبريت",
        reactionType: MetabolicType.SULFUR_OX,
        description: "Oxidation of the sulfur atom in sulfides (thioethers) to sulfoxides, and further to sulfones.",
        descriptionAr: "أكسدة ذرة الكبريت في السلفيدات (الثيوإيثر) إلى سلفوكسيد، ثم إلى سلفون.",
        products: "Sulfide -> Sulfoxide -> Sulfone.",
        productsAr: "سلفيد -> سلفوكسيد -> سلفون.",
        pdfReference: "Page 14-15",
    },

    // 6. sp2 N Oxidation
    "sp2_n_ox": {
        id: "sp2_n_ox",
        title: "sp² N-Oxidation",
        titleAr: "أكسدة النيتروجين (sp²)",
        reactionType: MetabolicType.SP2_N_OX,
        description: "Oxidation of sp² hybridized nitrogen in aromatic heterocycles (like Pyridine). Forms a stable N-Oxide zwitterion.",
        descriptionAr: "أكسدة النيتروجين المهجن sp² في الحلقات العطرية غير المتجانسة (مثل البيريدين). يكون N-Oxide مستقر.",
        products: "N-Oxide.",
        productsAr: "أكسيد النيتروجين (N-Oxide).",
        pdfReference: "Page 16-17",
    },

    // 7. Oxidative Dealkylation (N/O/S)
    "dealk_n": {
        id: "dealk_n",
        title: "N-Dealkylation",
        titleAr: "نزع الألكيل من النيتروجين (N-Dealkylation)",
        reactionType: MetabolicType.OXIDATIVE_DEALK,
        description: "Oxidative removal of alkyl groups from Nitrogen. Requires an alpha-hydrogen.",
        descriptionAr: "الإزالة الأكسدية لمجموعات الألكيل من النيتروجين. تتطلب وجود هيدروجين ألفا.",
        products: "Amine + Aldehyde/Ketone.",
        productsAr: "أمين + ألدهيد/كيتون.",
        pdfReference: "Page 18-22",
    },
    "dealk_o": {
        id: "dealk_o",
        title: "O-Dealkylation",
        titleAr: "نزع الألكيل من الأكسجين (O-Dealkylation)",
        reactionType: MetabolicType.OXIDATIVE_DEALK,
        description: "Oxidative removal of alkyl groups from Oxygen (Ethers). Converts ether to phenol/alcohol.",
        descriptionAr: "الإزالة الأكسدية لمجموعات الألكيل من الأكسجين (الإيثرات). تحول الإيثر إلى فينول/كحول.",
        products: "Phenol/Alcohol + Aldehyde.",
        productsAr: "فينول/كحول + ألدهيد.",
        pdfReference: "Page 23",
    },
    "dealk_s": {
        id: "dealk_s",
        title: "S-Dealkylation",
        titleAr: "نزع الألكيل من الكبريت (S-Dealkylation)",
        reactionType: MetabolicType.OXIDATIVE_DEALK,
        description: "Oxidative removal of alkyl groups from Sulfur. Analogous to O- and N-dealkylation.",
        descriptionAr: "الإزالة الأكسدية لمجموعات الألكيل من الكبريت. مماثلة لنزع الألكيل من الأكسجين والنيتروجين.",
        products: "Thiol + Aldehyde.",
        productsAr: "ثيول + ألدهيد.",
        pdfReference: "Page 23",
    }
};
