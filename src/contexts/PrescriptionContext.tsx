import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PrescriptionItem {
  id: string;
  drugId?: string;
  genericName: string;
  banglaName?: string;
  brandName: string;
  formulation: string;
  doseDisplay: string;
  activeMg?: number;
  frequency: string;
  duration: string;
  instructions?: string;
  reconstitutionNote?: string;
}

interface PrescriptionContextType {
  items: PrescriptionItem[];
  patientName: string;
  guardianName: string;
  diagnosis: string;
  investigations: string;
  advice: string;
  followUp: string;
  isOpenPad: boolean;
  setIsOpenPad: (open: boolean) => void;
  addItem: (item: Omit<PrescriptionItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<PrescriptionItem>) => void;
  clearPrescription: () => void;
  setPatientName: (name: string) => void;
  setGuardianName: (name: string) => void;
  setDiagnosis: (diag: string) => void;
  setInvestigations: (inv: string) => void;
  setAdvice: (adv: string) => void;
  setFollowUp: (fup: string) => void;
  itemCount: number;
}

const PrescriptionContext = createContext<PrescriptionContextType | undefined>(undefined);

const STORAGE_KEY = 'shishudose_prescription_draft_v1';

export const PrescriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<PrescriptionItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.items || [];
      }
    } catch (e) {
      console.warn('Failed to load prescription draft from storage', e);
    }
    return [];
  });

  const [patientName, setPatientName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).patientName || '' : '';
    } catch {
      return '';
    }
  });

  const [guardianName, setGuardianName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).guardianName || '' : '';
    } catch {
      return '';
    }
  });

  const [diagnosis, setDiagnosis] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).diagnosis || '' : '';
    } catch {
      return '';
    }
  });

  const [investigations, setInvestigations] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).investigations || '' : '';
    } catch {
      return '';
    }
  });

  const [advice, setAdvice] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).advice || 'প্রচুর তরল ও বুকের দুধ খাওয়ান। জ্বর বেশি হলে কপালে জলপট্টি দিন। শিশুর শ্বাসকষ্ট, খিঁচুনি বা নিস্তেজতা দেখা দিলে অবিলম্বে হাসপাতালে আনুন।' : 'প্রচুর তরল ও বুকের দুধ খাওয়ান। জ্বর বেশি হলে কপালে জলপট্টি দিন। শিশুর শ্বাসকষ্ট, খিঁচুনি বা নিস্তেজতা দেখা দিলে অবিলম্বে হাসপাতালে আনুন।';
    } catch {
      return 'প্রচুর তরল ও বুকের দুধ খাওয়ান। জ্বর বেশি হলে কপালে জলপট্টি দিন। শিশুর শ্বাসকষ্ট, খিঁচুনি বা নিস্তেজতা দেখা দিলে অবিলম্বে হাসপাতালে আনুন।';
    }
  });

  const [followUp, setFollowUp] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).followUp || '৩ দিন পর বা প্রয়োজনে অবিলম্বে' : '৩ দিন পর বা প্রয়োজনে অবিলম্বে';
    } catch {
      return '৩ দিন পর বা প্রয়োজনে অবিলম্বে';
    }
  });

  const [isOpenPad, setIsOpenPad] = useState(false);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          items,
          patientName,
          guardianName,
          diagnosis,
          investigations,
          advice,
          followUp
        })
      );
    } catch (e) {
      console.warn('Failed to save prescription draft', e);
    }
  }, [items, patientName, guardianName, diagnosis, investigations, advice, followUp]);

  const addItem = (item: Omit<PrescriptionItem, 'id'>) => {
    const newItem: PrescriptionItem = {
      ...item,
      id: `rx_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
    };
    setItems((prev) => {
      // If same generic already added, replace or add as second line
      const existingIdx = prev.findIndex(
        (p) => p.genericName.toLowerCase() === item.genericName.toLowerCase()
      );
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = newItem;
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<PrescriptionItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const clearPrescription = () => {
    setItems([]);
    setPatientName('');
    setGuardianName('');
    setDiagnosis('');
    setInvestigations('');
    setAdvice('প্রচুর তরল ও বুকের দুধ খাওয়ান। জ্বর বেশি হলে কপালে জলপট্টি দিন। শিশুর শ্বাসকষ্ট, খিঁচুনি বা নিস্তেজতা দেখা দিলে অবিলম্বে হাসপাতালে আনুন।');
    setFollowUp('৩ দিন পর বা প্রয়োজনে অবিলম্বে');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <PrescriptionContext.Provider
      value={{
        items,
        patientName,
        guardianName,
        diagnosis,
        investigations,
        advice,
        followUp,
        isOpenPad,
        setIsOpenPad,
        addItem,
        removeItem,
        updateItem,
        clearPrescription,
        setPatientName,
        setGuardianName,
        setDiagnosis,
        setInvestigations,
        setAdvice,
        setFollowUp,
        itemCount: items.length
      }}
    >
      {children}
    </PrescriptionContext.Provider>
  );
};

export const usePrescription = () => {
  const context = useContext(PrescriptionContext);
  if (!context) {
    throw new Error('usePrescription must be used within a PrescriptionProvider');
  }
  return context;
};
