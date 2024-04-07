import { ActivityIndicator, ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Header, Loading, OptionsModal } from "components";
import { EmptyCart, Products, Summary, VoucherInput } from "./components";
import { showNotificationWhenFail, showNotificationWhenSuccess } from "reduxApp/sagas/services/middleware";
import { useDispatch, useSelector } from "react-redux";

import AppActions from "reduxApp/actions/app";
import React from "react";
import { Text } from "core/components";
import colors from "constants/colors";
import { goBack } from "core/navigations/actions";
import styles from "./styles";
import { useState } from "core/hooks";

const Cart = () => {
  const [state, setState] = useState({
    initState: {
      modalVisibility: false,
      voucher: "",
      isAppliedVoucher: false,
      loading: false,
      checkoutLoading: false,
      voucherLoading: false,
    },
  });
  const { modalVisibility, refresh, loading, voucher, voucherLoading, checkoutLoading } = state;
  const {
    userData: { basket },
  } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const onClear = () => {
    setState({ modalVisibility: false });
    setTimeout(() => {
      dispatch(AppActions.clearBasket());
      goBack();
    }, 500);
  };

  const applyVoucher = () => {
    setState({ voucherLoading: true });
    setTimeout(() => {
      showNotificationWhenFail({ Message: "errors.promoNotFound" });
      setState({ voucherLoading: false });
    }, 2000);
  };

  const tail = () => (
    <TouchableOpacity onPress={() => setState({ modalVisibility: true })}>
      <Text style={styles.clearText}>common.clear</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header label="bar.myCart" rightComponent={basket?.length > 0 && tail} />
      {basket?.length <= 0 && <EmptyCart message="cart.basketEmpty" />}
      {basket?.length > 0 && (
        <>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Products
              onClearCart={() => setState({ modalVisibility: true })}
              onChangeLoading={(loading) => setState({ loading })}
              onRefresh={() => setState({ refresh: !refresh })}
              mainColor={colors.primary}
              data={basket}
              containerStyle={styles.productsContainer}
            />
            <VoucherInput
              isApplied={false}
              onChange={(voucher) => setState({ voucher })}
              value={voucher}
              voucherLoading={voucherLoading}
              onClearValue={() => {}}
              onDeApply={() => {}}
              onApply={applyVoucher}
              mainColor={colors.primary}
              containerStyle={styles.voucherInputContainer}
              info={""}
              isError={true}
            />
            <Summary mainColor={colors.primary} total={basket.reduce((total, item) => total + item.price * item.count, 0).parseNumberDots()} containerStyle={styles.summaryContainer} />
          </ScrollView>
          <View style={{ marginHorizontal: 16 }}>
            <Button
              leftIconComponent={!!checkoutLoading && (() => <ActivityIndicator style={{ marginRight: 8 }} size="small" color={colors.primary} />)}
              labelStyle={styles.checkoutLabel}
              contentStyle={styles.checkoutContent}
              onPress={() => {
                setState({ checkoutLoading: true });
                setTimeout(() => {
                  showNotificationWhenSuccess({ Message: "cart.checkoutSuccess" });
                  dispatch(AppActions.clearBasket());
                  setState({ checkoutLoading: false });
                }, 1000);
              }}
              label="cart.checkout"
              containerStyle={styles.checkoutButton}
            />
          </View>
          {loading && <Loading absolute transparent />}
        </>
      )}
      <OptionsModal
        onOption={onClear}
        onCancel={() => setState({ modalVisibility: false })}
        onDismiss={() => setState({ modalVisibility: false })}
        isVisible={modalVisibility}
        withOptions
        optionLabel="common.clear"
        icon={"clearCart"}
        label="cart.clearBasket"
        description="cart.deleteBasketHint"
      />
    </View>
  );
};

export default Cart;
