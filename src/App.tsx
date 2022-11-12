import { Parser } from "@dbml/core";
import { Stack, AppShell, Navbar, Header, Textarea } from "@mantine/core";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DbSchema } from "./DbSchema";
import { db1 } from "./fixtures/db1.dbml";

export function App() {
  return (
    <DbmlProvider>
      <AppInner />
    </DbmlProvider>
  );
}

const DbmlContext = createContext<any>(null);

function DbmlProvider({ children }: { children: ReactNode }) {
  const [dbmlStr, setDbmlStr] = useState("");

  useEffect(() => {
    setDbmlStr(db1);
  }, []);

  const db = useMemo(() => {
    try {
      const db = Parser.parse(db1, "dbml");
      return db;
    } catch (e) {
      console.error("malformed dbml text", e);
      return null;
    }
  }, [dbmlStr]);

  const store = useMemo(() => {
    return {
      setDbmlStr,
      dbmlStr,
      db,
    };
  }, [dbmlStr, db]);

  return <DbmlContext.Provider value={store}>{children}</DbmlContext.Provider>;
}

function AppInner() {
  return (
    <AppShell
      padding="md"
      navbar={AppNavbar()}
      header={
        <Header height={60} p="xs">
          {/* Header content */}
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <DbSchema />
    </AppShell>
  );
}

function AppNavbar() {
  const { dbmlStr, setDbmlStr } = useContext(DbmlContext);

  return (
    <Navbar width={{ base: 300 }} p="xs">
      <Navbar.Section grow mt="md">
        <Textarea
          value={dbmlStr}
          onChange={(event) => setDbmlStr(event.currentTarget.value)}
          sx={{
            height: "100%",
            ".mantine-Textarea-wrapper": {
              height: "100%",
            },
            ".mantine-Textarea-input": {
              height: "100%",
            },
          }}
        />
      </Navbar.Section>
    </Navbar>
  );
}
