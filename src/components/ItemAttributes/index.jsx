import * as React from "react";
import Box from "@mui/joy/Box";
import FormLabel from "@mui/joy/FormLabel";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";

export default function ExampleProductAttributes({ handlerSetTalle }) {
  return (
    <Box onClick={handlerSetTalle} sx={{ overflow: "auto", pl: 0.5, mb: 2 }}>
      <FormLabel
        id="product-size-attribute"
        sx={{
          mb: 1.5,
          fontWeight: "xl",
          textTransform: "uppercase",
          fontSize: "xs",
          letterSpacing: "0.15rem",
          color: "white"
        }}>
        Size
      </FormLabel>
      <RadioGroup
        aria-labelledby="product-size-attribute"
        defaultValue="M"
        sx={{ gap: 2, mb: 1, flexWrap: "wrap", flexDirection: "row" }}>
        {["S", "M", "L", "XL"].map(size => (
          <Sheet
            key={size}
            sx={{
              position: "relative",
              width: 40,
              height: 40,
              flexShrink: 0,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "--joy-focus-outlineOffset": "4px",
              "--joy-palette-focusVisible": theme =>
                theme.vars.palette.neutral.outlinedBorder,
              [`& .${radioClasses.checked}`]: {
                [`& .${radioClasses.label}`]: {
                  fontWeight: "lg"
                },
                [`& .${radioClasses.action}`]: {
                  "--variant-borderWidth": "2px",
                  borderColor: "text.secondary"
                },
              },
              [`& .${radioClasses.action}.${radioClasses.focusVisible}`]: {
                outlineWidth: "2px"
              }
            }}>
            <Radio color="neutral" overlay disableIcon value={size} label={size} />
          </Sheet>
        ))}
      </RadioGroup>
    </Box>
  );
};