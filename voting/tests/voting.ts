import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Voting } from "../target/types/voting";

describe("voting", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.voting as Program<Voting>;

  const wallet = provider.wallet as anchor.Wallet;

  it("Initialized poll!", async () => {
    const tx = program.methods.initalizePoll(
        new anchor.BN(1),
        new anchor.BN(0),
        new anchor.BN(1759916844),
        "What is you favorite peanut butter"
    ).accounts({signer:wallet.publicKey}).rpc()

  });
});
