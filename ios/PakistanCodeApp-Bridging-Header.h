//
//  Use this file to import your target's public headers that you would like to expose to Swift.
//


#import <UIKit/UIKit.h>

@interface MyViewController : UIViewController

@property (nonatomic, strong) UIProgressView *progressBar;
@property (nonatomic, strong) NSTimer *progressTimer;

@end
