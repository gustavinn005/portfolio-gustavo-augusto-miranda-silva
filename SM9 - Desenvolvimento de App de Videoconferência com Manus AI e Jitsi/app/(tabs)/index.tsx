import { ScrollView, Text, View, Pressable } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'expo-router';
import { useCart } from '@/lib/cart-context';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const router = useRouter();
  const cartCount = items.length;

  const handleNavigation = async (route: string) => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push(route as any);
  };

  const handleLogout = async () => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    await logout();
  };

  return (
    <ScreenContainer className="bg-gradient-to-b from-blue-50 to-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="flex-1 px-6 py-8 gap-6">
          {/* Header */}
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-3xl font-bold text-foreground">StreamBuy</Text>
              <Text className="text-sm text-muted">Bem-vindo, {user}!</Text>
            </View>
            <Pressable
              onPress={handleLogout}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <Text className="text-primary font-semibold text-sm">Sair</Text>
            </Pressable>
          </View>

          {/* Main Navigation Cards */}
          <View className="gap-4 flex-1 justify-center">
            {/* Assistir Live Card */}
            <Pressable
              onPress={() => handleNavigation('/live' as any)}
              style={({ pressed }) => [
                { transform: [{ scale: pressed ? 0.98 : 1 }], opacity: pressed ? 0.9 : 1 },
              ]}
              className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-6 shadow-lg"
            >
              <View className="gap-2">
                <Text className="text-4xl">📺</Text>
                <Text className="text-2xl font-bold text-white">Assistir Live</Text>
                <Text className="text-sm text-white/80">Participe de uma transmissão ao vivo</Text>
              </View>
            </Pressable>

            {/* Ver Produtos Card */}
            <Pressable
              onPress={() => handleNavigation('/products' as any)}
              style={({ pressed }) => [
                { transform: [{ scale: pressed ? 0.98 : 1 }], opacity: pressed ? 0.9 : 1 },
              ]}
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-lg"
            >
              <View className="gap-2">
                <Text className="text-4xl">🛍️</Text>
                <Text className="text-2xl font-bold text-white">Ver Produtos</Text>
                <Text className="text-sm text-white/80">Explore nossa loja de produtos</Text>
              </View>
            </Pressable>

            {/* Meu Carrinho Card */}
            <Pressable
              onPress={() => handleNavigation('/cart' as any)}
              style={({ pressed }) => [
                { transform: [{ scale: pressed ? 0.98 : 1 }], opacity: pressed ? 0.9 : 1 },
              ]}
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 shadow-lg"
            >
              <View className="gap-2">
                <View className="flex-row justify-between items-start">
                  <Text className="text-4xl">🛒</Text>
                  {cartCount > 0 && (
                    <View className="bg-red-500 rounded-full w-6 h-6 items-center justify-center">
                      <Text className="text-white text-xs font-bold">{cartCount}</Text>
                    </View>
                  )}
                </View>
                <Text className="text-2xl font-bold text-white">Meu Carrinho</Text>
                <Text className="text-sm text-white/80">
                  {cartCount > 0 ? `${cartCount} item${cartCount > 1 ? 's' : ''}` : 'Carrinho vazio'}
                </Text>
              </View>
            </Pressable>
          </View>

          {/* Info Section */}
          <View className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <Text className="text-sm font-semibold text-foreground mb-2">💡 Como funciona:</Text>
            <Text className="text-xs text-muted leading-relaxed">
              1. Clique em "Assistir Live" para entrar em uma transmissão ao vivo
              {'\n'}2. Use o botão "Comprar Agora" para adquirir produtos em tempo real
              {'\n'}3. Gerencie seu carrinho e finalize a compra
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
