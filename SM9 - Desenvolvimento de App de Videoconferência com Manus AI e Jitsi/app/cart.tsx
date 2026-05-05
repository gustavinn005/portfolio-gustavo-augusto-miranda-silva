import { FlatList, Pressable, Text, View, ScrollView } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter } from 'expo-router';
import { useCart } from '@/lib/cart-context';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export default function CartScreen() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  const handleRemoveItem = (id: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    removeItem(id);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleCheckout = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    clearCart();
    router.push('/checkout' as any);
  };

  const handleBack = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View className="bg-white border-b border-border p-4 flex-row gap-4">
      {/* Product Image */}
      <View className="bg-gray-100 w-20 h-20 rounded-lg items-center justify-center">
        <Text className="text-3xl">📦</Text>
      </View>

      {/* Product Info */}
      <View className="flex-1 justify-between">
        <View className="gap-1">
          <Text className="text-base font-semibold text-foreground">{item.name}</Text>
          <Text className="text-sm text-muted">${item.price.toFixed(2)}</Text>
        </View>

        {/* Quantity Controls */}
        <View className="flex-row items-center gap-2">
          <Pressable
            onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            className="bg-gray-200 w-8 h-8 rounded items-center justify-center"
          >
            <Text className="font-bold text-foreground">−</Text>
          </Pressable>
          <Text className="w-8 text-center font-semibold text-foreground">{item.quantity}</Text>
          <Pressable
            onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            className="bg-gray-200 w-8 h-8 rounded items-center justify-center"
          >
            <Text className="font-bold text-foreground">+</Text>
          </Pressable>
        </View>
      </View>

      {/* Remove Button */}
      <Pressable
        onPress={() => handleRemoveItem(item.id)}
        style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
        className="justify-center"
      >
        <Text className="text-red-500 font-bold text-lg">✕</Text>
      </Pressable>
    </View>
  );

  return (
    <ScreenContainer className="bg-white">
      <View className="flex-1 gap-0">
        {/* Header */}
        <View className="px-6 py-4 border-b border-border flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-foreground">Meu Carrinho</Text>
            <Text className="text-sm text-muted">{items.length} item{items.length !== 1 ? 's' : ''}</Text>
          </View>
          <Pressable
            onPress={handleBack}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            className="px-4 py-2"
          >
            <Text className="text-primary font-semibold">← Voltar</Text>
          </Pressable>
        </View>

        {items.length === 0 ? (
          // Empty State
          <View className="flex-1 items-center justify-center gap-4">
            <Text className="text-6xl">🛒</Text>
            <Text className="text-lg font-semibold text-foreground">Carrinho Vazio</Text>
            <Text className="text-sm text-muted text-center px-6">
              Adicione produtos da live ou da loja para começar
            </Text>
            <Pressable
              onPress={handleBack}
              style={({ pressed }) => [
                {
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
              className="bg-primary rounded-lg px-6 py-3 mt-4"
            >
              <Text className="text-white font-semibold">Continuar Comprando</Text>
            </Pressable>
          </View>
        ) : (
          // Cart Items
          <View className="flex-1">
            <FlatList
              data={items}
              renderItem={renderCartItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={true}
            />

            {/* Total and Checkout */}
            <View className="border-t border-border p-6 gap-4 bg-gray-50">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-foreground">Total:</Text>
                <Text className="text-3xl font-bold text-primary">
                  ${total.toFixed(2)}
                </Text>
              </View>

              <Pressable
                onPress={handleCheckout}
                style={({ pressed }) => [
                  {
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                    opacity: pressed ? 0.9 : 1,
                  },
                ]}
                className="bg-primary rounded-lg py-4 items-center"
              >
                <Text className="text-white font-bold text-lg">Finalizar Compra</Text>
              </Pressable>

              <Pressable
                onPress={handleBack}
                style={({ pressed }) => [
                  {
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                    opacity: pressed ? 0.9 : 1,
                  },
                ]}
                className="bg-gray-200 rounded-lg py-4 items-center"
              >
                <Text className="text-foreground font-semibold text-lg">Continuar Comprando</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}
