import { AUTH_UI } from '@/constants/auth-ui';
import { PracticeLicense } from '@/models/practice.model';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface LicenseSelectorSheetProps {
  visible: boolean;
  onSelect: (license: PracticeLicense) => void;
  onClose: () => void;
}

const LICENSES: { value: PracticeLicense; label: string; description: string }[] = [
  { value: 'B1', label: 'Bằng B1', description: 'Ô tô số tự động dưới 9 chỗ' },
  { value: 'B2', label: 'Bằng B2', description: 'Ô tô số sàn dưới 9 chỗ' },
  { value: 'C', label: 'Bằng C', description: 'Xe tải, xe chuyên dụng' },
];

export function LicenseSelectorSheet({ visible, onSelect, onClose }: LicenseSelectorSheetProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>Chọn hạng bằng</Text>
        <Text style={styles.subtitle}>Chọn hạng bằng để xem nội dung phù hợp</Text>

        {LICENSES.map((license) => (
          <TouchableOpacity
            key={license.value}
            style={styles.option}
            onPress={() => onSelect(license.value)}
            activeOpacity={0.8}
          >
            <View style={styles.optionBadge}>
              <Text style={styles.optionBadgeText}>{license.value}</Text>
            </View>
            <View style={styles.optionText}>
              <Text style={styles.optionLabel}>{license.label}</Text>
              <Text style={styles.optionDesc}>{license.description}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.8}>
          <Text style={styles.cancelText}>Huỷ</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheet: {
    backgroundColor: AUTH_UI.colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: AUTH_UI.colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: AUTH_UI.colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: AUTH_UI.colors.textSecondary,
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AUTH_UI.colors.surfaceMuted,
    borderRadius: AUTH_UI.radius.lg,
    padding: 14,
    marginBottom: 10,
    gap: 14,
  },
  optionBadge: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: AUTH_UI.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionBadgeText: {
    fontSize: 15,
    fontWeight: '700',
    color: AUTH_UI.colors.accentText,
  },
  optionText: {
    flex: 1,
    gap: 3,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: AUTH_UI.colors.textPrimary,
  },
  optionDesc: {
    fontSize: 12,
    color: AUTH_UI.colors.textSecondary,
  },
  cancelBtn: {
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 4,
    backgroundColor: AUTH_UI.colors.surfaceMuted,
    borderRadius: AUTH_UI.radius.lg,
  },
  cancelText: {
    fontSize: 15,
    color: AUTH_UI.colors.textSecondary,
    fontWeight: '500',
  },
});
