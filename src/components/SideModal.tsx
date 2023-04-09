import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from '../../tailwind.config'
import type { Category } from '@prisma/client'

type CategoryType = Category;

export default function TemporaryDrawer(categories: any) {
    // categories = Object.values(categories);

    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, left: open });
            };

    const content = () => {
        return (
            <>
                {/* {categories.map(category => {
                    return (
                        <div key={category.categoryId}>
                            {category.categoryName}
                        </div>
                    )
                })} */}
            </>
        )

    };

    const tertiary = (resolveConfig(tailwindConfig) as any).theme.colors.tertiary;

    return (
        <div>
            <Button onClick={toggleDrawer(true)}><MenuIcon></MenuIcon></Button>
            <Drawer
                anchor="left"
                open={state.left}
                onClose={toggleDrawer(false)}

                PaperProps={{
                    sx: {
                        backgroundColor: tertiary,
                        width: "35%",
                        padding: "15px"
                    }
                }}
            >
                {content()}
            </Drawer>
        </div>
    );
}