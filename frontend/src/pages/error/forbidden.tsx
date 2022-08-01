import { Box, Button, Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Head } from "../../components/common/Head";
import { pagesPath } from "../../utils/$path";

const Forbidden = () => {
    return (
        <>
            <Head title="403エラー" description="403エラー" keyword="403エラー" />
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box>
                    <Image
                        width="400px"
                        height="400px"
                        src="/403ErrorForbidden-pana.svg"
                    />
                </Box>
                <Button color="primary" variant="contained" size="large">
                    <Link href={pagesPath.top.$url().pathname as string}>
                        <a style={{ color: "white", textDecoration: "none" }}>
                            トップへ戻る
                        </a>
                    </Link>
                </Button>
            </Container>
        </>
    );
};

export default Forbidden;
