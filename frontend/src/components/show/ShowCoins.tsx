import { useState, useEffect } from "react";
import { useFuel } from "../../hooks/useFuel"
import { BN } from "fuels"
import { Box } from "@fuel-ui/react";
import { cssObj } from "@fuel-ui/css";
import { CONTRACT_ID } from "../../constants";

interface ShowCoinsProps {
  updateNum: number;
}

export default function ShowCoins({ updateNum }: ShowCoinsProps){
    const [balance, setBalance] = useState<BN>();
    const [fuel] = useFuel();

    useEffect(() => {
        async function getAccounts() {
          const currentAccount = await fuel.currentAccount();
          const wallet = await fuel.getWallet(currentAccount)
          const walletBalance = await wallet.getBalance(CONTRACT_ID);
          setBalance(walletBalance);
        }
        if (fuel) getAccounts();
      }, [fuel, updateNum]);

      
    return (
        <>
            {balance && <Box css={styles}>Farm Coins: {balance.format()}</Box>}
        </>
    )
}

let styles = cssObj({
  fontFamily: 'pressStart2P',
  fontSize: '$sm'
})