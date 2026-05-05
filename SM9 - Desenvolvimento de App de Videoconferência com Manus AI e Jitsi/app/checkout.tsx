import { ScrollView, Pressable, Text, View } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export default function CheckoutScreen() {
  const router = useRouter();

  const handleBackHome = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.replace('/(tabs)' as any);
  };

  return (
    <ScreenContainer className="bg-gradient-to-b from-green-50 to-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="flex-1 items-center justify-center px-6 gap-6">
          {/* Success Icon */}
          <View className="w-24 h-24 rounded-full bg-green-100 items-center justify-center">
            <Text className="text-6xl">✓</Text>
          </View>

          {/* Success Message */}
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">Compra Confirmada!</Text>
            <Text className="text-base text-muted text-center">
              Seu pedido foi processado com sucesso
            </Text>
          </View>

          {/* Order Details Card */}
          <View className="w-full bg-white rounded-2xl p-6 border border-green-200 gap-4">
            <View className="flex-row justify-between pb-4 border-b border-border">
              <Text className="text-sm text-muted">Número do Pedido</Text>
              <Text className="font-semibold text-foreground">#SB{Math.random().toString(36).substr(2, 9).toUpperCase()}</Text>
            </View>

            <View className="flex-row justify-between pb-4 border-b border-border">
              <Text className="text-sm text-muted">Status</Text>
              <View className="bg-green-100 rounded-full px-3 py-1">
                <Text className="text-xs font-semibold text-green-700">Confirmado</Text>
              </View>
            </View>

            <View className="flex-row justify-between pb-4 border-b border-border">
              <Text className="text-sm text-muted">Data</Text>
              <Text className="font-semibold text-foreground">{new Date().toLocaleDateString('pt-BR')}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-sm text-muted">Horário</Text>
              <Text className="font-semibold text-foreground">{new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</Text>
            </View>
          </View>

          {/* Info Box */}
          <View className="w-full bg-blue-50 rounded-lg p-4 border border-blue-200 gap-2">
            <Text className="font-semibold text-foreground text-sm">📧 Confirmação enviada</Text>
            <Text className="text-xs text-muted">
              Você receberá um email com os detalhes do seu pedido e informações de entrega
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="w-full gap-3 mt-4">
            <Pressable
              onPress={handleBackHome}
              style={({ pressed }) => [
                {
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
              className="bg-primary rounded-lg py-4 items-center"
            >
              <Text className="text-white font-bold text-lg">Voltar para Home</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                {
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
              className="bg-gray-200 rounded-lg py-4 items-center"
            >
              <Text className="text-foreground font-semibold text-lg">Ver Meus Pedidos</Text>
            </Pressable>
          </View>

          {/* Footer Text */}
          <Text className="text-xs text-muted text-center mt-4">
            Obrigado por comprar na StreamBuy! Aproveite nossas próximas lives ao vivo.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
