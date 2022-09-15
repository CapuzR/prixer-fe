dfx identity use default
dfx identity remove minter
dfx identity new --disable-encryption minter
dfx identity use minter
export MINT_ACC=$(dfx ledger account-id)


dfx identity use default;
export LEDGER_ACC=$(dfx ledger account-id);
dfx identity remove testAcc;
dfx identity new --disable-encryption testAcc;
dfx identity use testAcc;
export TEST_ACC=$(dfx ledger account-id);

dfx identity use default;

# Use private api for install
rm ledger.did;
cp ledger.private.did ledger.did;

# Excecute PrixerApp Service
dfx deploy socials --argument '(record { authorized = vec { principal "'$(dfx identity get-principal)'" }})'
dfx canister call socials createAssetCan
dfx deploy artistRegistry --argument '(record { admins = vec { principal "'$(dfx identity get-principal)'" }; artistWhitelist = vec { principal "'$(dfx identity get-principal)'" }})'
dfx canister call artistRegistry createAssetCan
dfx canister call artistRegistry whitelistArtists '(vec { principal "6b6h7-jofyl-qgbpt-nhngb-d7bkj-2kskw-udjjc-lvn35-vcjac-kb5f3-2qe" })'
dfx canister call artistRegistry whitelistArtists '(vec { principal "5ol4m-s6nms-jwn5v-hw36m-n44xo-v62am-ks5nv-2msde-en2pg-bhpmg-pqe" })'
dfx deploy prixelart_assets


export SOCIALS_ID=$(dfx canister id socials);

export ARTIST_CANID=$(dfx canister id artistRegistry);


# Excecute Ledger Canister
dfx deploy --network=local ledger --argument '(record {
  token_name = opt "ICP";
  token_symbol = opt "ICP";
  minting_account = "'${MINT_ACC}'";
  transfer_fee = opt record{ e8s = 10_000 };
  initial_values = vec { record { "'${LEDGER_ACC}'"; record { e8s=100_000_000_000 } }; record { "'${TEST_ACC}'"; record { e8s=100_000_000_000 } }; };
  send_whitelist = vec {};
})'

# Replace with public api
rm ledger.did;
cp ledger.public.did ledger.did;


dfx canister call ledger transfer '( record {
    fee = record { e8s = 10_000 };
    to = '$(python3 -c 'print("vec{" + ";".join([str(b) for b in bytes.fromhex("29a22631e045fda0ffa0d3a0097889113841513456485228587ad7986be495c8")]) + "}")')';
    from_subaccount = null;
    created_at_time = null;
    memo = 0;
    amount = record { e8s = 4_000_000_000 };
})';

dfx wallet --network local send "${ARTIST_CANID}" 10000000000000
dfx generate